const PDFDocument = require('pdfkit');

// ============================================================
// FORMATTING HELPERS
// These just transform raw DB values into display-friendly strings.
// Change these if you want different date/number formats.
// ============================================================

// Converts ISO date string (e.g. "2026-08-15T00:00:00.000Z") -> "15 August 2026"
const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

// Converts 50000 -> "INR 50,000"
// Using currency CODE ("INR") not the ₹ symbol, because PDFKit's default
// fonts (Helvetica) don't have a ₹ glyph — it would render as a blank box.
const formatCurrency = (amount, currency = 'INR') =>
  `${currency} ${Number(amount).toLocaleString('en-IN')}`;

// ============================================================
// MAIN PDF GENERATOR
// contract = the Mongoose document fetched from DB
// stream   = where the PDF bytes get written (res object in your routes,
//            so the PDF streams straight to the browser without saving to disk)
// ============================================================
function generateContractPDF(contract, stream) {
  // Create a new PDF, A4 size, 50pt margin on all sides
  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  // Connect the PDF's output directly to the response stream.
  // Nothing is actually sent to the browser until doc.end() is called at the bottom.
  doc.pipe(stream);

  // ------------------------------------------------------------
  // LAYOUT HELPERS
  // Small reusable functions bound to this specific `doc` instance,
  // so you don't repeat the same font/size code everywhere below.
  // If you want to change how ALL section titles or key-value pairs
  // look, you only edit it here — not in every section.
  // ------------------------------------------------------------

  // Draws a section title (e.g. "1. Parties") with an underline below it
  const sectionHeader = (title) => {
    doc.moveDown(1); // adds vertical spacing before the section starts
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#000').text(title);
    // draws a light grey horizontal line under the title
    doc.moveTo(50, doc.y + 2).lineTo(545, doc.y + 2).strokeColor('#ccc').stroke();
    doc.moveDown(0.5);
  };

  // Draws "Label: value" on one line, label in bold, value in normal weight.
  // { continued: true } means "don't start a new line yet, more text is coming"
  const keyValue = (label, value) => {
    doc.font('Helvetica-Bold').fontSize(10.5).text(`${label}: `, { continued: true });
    doc.font('Helvetica').text(`${value}`);
  };

  // Renders an array of strings as a bullet list (used for deliverables)
  const bulletList = (items) => {
    items.forEach((item) => doc.font('Helvetica').fontSize(10.5).text(`•  ${item}`));
  };

  // ================= HEADER =================
  // Big centered contract title + subtitle showing contract type (e.g. "Web Development")
  doc.font('Helvetica-Bold').fontSize(20).text('Freelance Service Agreement', { align: 'center' });
  doc.font('Helvetica').fontSize(10).fillColor('#555')
     .text(`Contract Type: ${contract.templateType}`, { align: 'center' });
  doc.fillColor('#000'); // reset text color back to black for the rest of the doc
  doc.moveDown(1.5);

  // ================= SECTION 1: PARTIES =================
  // Pulls from contract.freelancerDetails and contract.clientDetails
  sectionHeader('1. Parties');

  doc.font('Helvetica-Bold').fontSize(11).text('Freelancer');
  keyValue('Name', contract.freelancerDetails.name);
  keyValue('Email', contract.freelancerDetails.email);
  keyValue('Phone', contract.freelancerDetails.phone);
  keyValue('Address', contract.freelancerDetails.address);
  doc.moveDown(0.5);

  doc.font('Helvetica-Bold').fontSize(11).text('Client');
  keyValue('Name', contract.clientDetails.name);
  keyValue('Company', contract.clientDetails.company);
  keyValue('Email', contract.clientDetails.email);
  keyValue('Address', contract.clientDetails.address);

  // ================= SECTION 2: PROJECT DETAILS =================
  // Pulls from contract.projectDetails
  sectionHeader('2. Project Details');

  keyValue('Title', contract.projectDetails.title);
  doc.moveDown(0.3);

  doc.font('Helvetica-Bold').fontSize(10.5).text('Description:');
  // { align: 'justify' } stretches text evenly across the line width, like a printed doc
  doc.font('Helvetica').fontSize(10.5).text(contract.projectDetails.description, { align: 'justify' });
  doc.moveDown(0.3);

  doc.font('Helvetica-Bold').fontSize(10.5).text('Deliverables:');
  bulletList(contract.projectDetails.deliverables); // array -> bullet points

  doc.moveDown(0.3);
  keyValue('Start Date', formatDate(contract.projectDetails.startDate));
  keyValue('End Date', formatDate(contract.projectDetails.endDate));

  // ================= SECTION 3: PAYMENT DETAILS =================
  // Pulls from contract.paymentDetails
  sectionHeader('3. Payment Details');

  keyValue('Total Amount', formatCurrency(contract.paymentDetails.totalAmount, contract.paymentDetails.currency));
  keyValue('Advance Payment', formatCurrency(contract.paymentDetails.advancePayment, contract.paymentDetails.currency));
  keyValue('Due Date', formatDate(contract.paymentDetails.dueDate));
  keyValue('Late Fee', `${contract.paymentDetails.lateFee}% per week on overdue amount`);

  // ================= SECTION 4: TERMS =================
  // Pulls from contract.terms
  sectionHeader('4. Terms & Conditions');

  keyValue('Revisions Included', contract.terms.revisions);
  keyValue('Ownership Transfer on Full Payment', contract.terms.ownershipTransfer ? 'Yes' : 'No');
  keyValue('Confidentiality (NDA) Applies', contract.terms.confidentiality ? 'Yes' : 'No');
  doc.moveDown(0.3);

  doc.font('Helvetica-Bold').fontSize(10.5).text('Cancellation Policy:');
  doc.font('Helvetica').fontSize(10.5).text(contract.terms.cancellation, { align: 'justify' });

  // ================= SECTION 5: STANDARD BOILERPLATE =================
  // This text is THE SAME in every contract PDF — it does not come from
  // the database. It's the STANDARD_CLAUSES constant defined below.
  // Edit STANDARD_CLAUSES to change wording; no changes needed here.
  sectionHeader('5. General Terms & Conditions');
  doc.font('Helvetica').fontSize(9.5).fillColor('#333').text(STANDARD_CLAUSES, { align: 'justify' });
  doc.fillColor('#000');

  // ================= SIGNATURE BLOCK =================
  doc.moveDown(3);
  // If we're too close to the bottom of the page, start a fresh page
  // so the signature lines don't get awkwardly split across pages.
  if (doc.y > 680) doc.addPage();

  const sigY = doc.y; // remember current vertical position for both signature lines
  doc.moveTo(50, sigY).lineTo(230, sigY).stroke();   // left line (client)
  doc.moveTo(320, sigY).lineTo(500, sigY).stroke();  // right line (freelancer)

  doc.fontSize(10)
     .text(contract.clientDetails.name, 50, sigY + 5)
     .text('Client Signature', 50, sigY + 18);

  doc.text(contract.freelancerDetails.name, 320, sigY + 5)
     .text('Freelancer Signature', 320, sigY + 18);

  // ================= FOOTER =================
  // Fixed position near bottom of page (y = 800), regardless of where content ended.
  // Shows generation date + Mongo _id, useful for tracing which version was downloaded.
  doc.fontSize(8).fillColor('#888')
     .text(`Generated on ${formatDate(new Date())} | Contract ID: ${contract._id}`, 50, 800, { align: 'center' });

  // Finalizes the PDF and flushes it through the piped stream.
  // Nothing renders in the browser/file until this line runs.
  doc.end();
}

// ============================================================
// STANDARD_CLAUSES
// Boilerplate legal text identical across every contract.
// Kept separate from the layout code above on purpose — you can
// rewrite this paragraph anytime without touching PDF drawing logic.
// ============================================================
const STANDARD_CLAUSES = `Independent Contractor Relationship: The Freelancer is engaged as an independent contractor and not as an employee, partner, or agent of the Client. Nothing in this Agreement shall be construed to create an employer-employee relationship.

Force Majeure: Neither party shall be liable for delays or failure to perform obligations due to causes beyond their reasonable control, including natural disasters, acts of government, or internet/infrastructure outages.

Dispute Resolution: Any disputes arising from this Agreement shall first be resolved through good-faith negotiation between the parties. If unresolved, disputes shall be subject to the jurisdiction of the courts where the Freelancer resides.

Entire Agreement: This document constitutes the entire agreement between the parties and supersedes all prior discussions, negotiations, and agreements, whether written or oral, relating to the subject matter herein.

Amendments: This Agreement may only be modified by a written amendment signed by both parties.`;

// Export so your route files can import and call generateContractPDF(contract, res)
module.exports = { generateContractPDF };