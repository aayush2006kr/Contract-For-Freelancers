import api from "./axios";

export const getAllContracts = () => {
  return api.get("/contract/all-contracts");
};

export const createContract = (contractData) =>
  api.post("/contract/create-contract", contractData);

export const previewContract = (contractId) =>
  api.get(`/contract/preview-contract/${contractId}`, { responseType: "blob" });

export const downloadContract = (contractId) =>
  api.get(`/contract/download-contract/${contractId}`, { responseType: "blob" });
