const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    templateType: {
      type: String,
      required: true,
      enum: [
        "Web Development",
        "Graphic Design",
        "Content Writing",
        "Digital Marketing",
        "Consulting",
      ],
    },

    freelancerDetails: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        trim: true,
      },
    },

    clientDetails: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      company: {
        type: String,
        trim: true,
      },

      address: {
        type: String,
        trim: true,
      },
    },

    projectDetails: {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
      },

      deliverables: {
    type: [
        {
            type: String,
            trim: true
        }
    ],
    required: true
},

      startDate: {
        type: Date,
        required: true,
      },

      endDate: {
        type: Date,
        required: true,
      },
    },

    paymentDetails: {
      totalAmount: {
        type: Number,
        required: true,
      },

      currency: {
        type: String,
        required: true,
        default: "INR",
      },

      advancePayment: {
        type: Number,
        default: 0,
      },

      dueDate: {
        type: Date,
        required: true,
      },

      lateFee: {
        type: Number,
        default: 0,
      },
    },

    terms: {
      revisions: {
        type: Number,
        default: 2,
      },

      ownershipTransfer: {
        type: Boolean,
        default: true,
      },

      cancellation: {
        type: String,
        default:
          "Either party may terminate the agreement with written notice.",
      },

      confidentiality: {
        type: Boolean,
        default: true,
      },
    },

    status: {
      type: String,
      enum: ["Draft", "Final", "Archived"],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  }
);

const contractModel = mongoose.model("contract", contractSchema);

module.exports = contractModel;