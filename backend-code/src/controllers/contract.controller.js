const contractModel = require("../models/contract.model")


async function createContract(req, res){

    const {
    templateType,
    freelancerDetails,
    clientDetails,
    projectDetails,
    paymentDetails,
    terms
} = req.body;


    if (
    !templateType ||
    !freelancerDetails ||
    !clientDetails ||
    !projectDetails ||
    !paymentDetails
) {
    return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
    });
}


    if (
    new Date(projectDetails.endDate) <
    new Date(projectDetails.startDate)
) {
    return res.status(400).json({
        success: false,
        message: "End date must be after start date"
    });
}

if (projectDetails.deliverables.length === 0) {
    return res.status(400).json({
        success: false,
        message: "At least one deliverable is required"
    });
}

if (
    paymentDetails.advancePayment >
    paymentDetails.totalAmount
) {
    return res.status(400).json({
        success: false,
        message: "Advance payment cannot exceed total amount"
    });
}


    const contract = await contractModel.create({
    userId: req.user._id,
    templateType,
    freelancerDetails,
    clientDetails,
    projectDetails,
    paymentDetails,
    terms
});

return res.status(201).json({
    success: true,
    message: "Contract created successfully",
    contract,
});

}


async function getAllContracts(req , res){
const contracts = await contractModel.find({
        userId: req.user._id
    }).sort({ createdAt: -1 });

 
 

     res.status(200).json({
        success:true,
        message:"Contracts fetched successfully",
        contracts:contracts
    })
    
}

async function oneContract(req , res){

    const {id} = req.params 

   const contract = await contractModel.findOne({
    _id: id,
    userId: req.user._id
});

   

   if(!contract){
    return res.status(404).json({
        success:false,
        message:"Contract Not Found"
    })
   }
 

     return  res.status(200).json({
        success:true,
        message:"Contract fetched successfully",
        contract:contract
    })
}

async function delContract(req, res) {

    const { id } = req.params;

    const contract = await contractModel.findOneAndDelete({
        _id: id,
        userId: req.user._id
    });

    if (!contract) {
        return res.status(404).json({
            success: false,
            message: "Contract not found"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Contract deleted successfully"
    });
}

async function updateContract(req , res){
    const { id } = req.params;

    const {
        templateType,
        freelancerDetails,
        clientDetails,
        projectDetails,
        paymentDetails,
        terms
    } = req.body;

    if (
        !templateType ||
        !freelancerDetails ||
        !clientDetails ||
        !projectDetails ||
        !paymentDetails
    ) {
        return res.status(400).json({
            success: false,
            message: "All required fields are required"
        });
    }

    if (
        new Date(projectDetails.endDate) <
        new Date(projectDetails.startDate)
    ) {
        return res.status(400).json({
            success: false,
            message: "End date must be after start date"
        });
    }

    const contract = await contractModel.findOneAndUpdate(
        {
            _id: id,
            userId: req.user._id
        },
        {
            templateType,
            freelancerDetails,
            clientDetails,
            projectDetails,
            paymentDetails,
            terms
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!contract) {
        return res.status(404).json({
            success: false,
            message: "Contract not found"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Contract updated successfully",
        contract
    });
}



module.exports = {createContract , getAllContracts , oneContract , delContract , updateContract}
