export enum InvoiceStatusEnum {
    DRAFT = "DRAFT",
    UNPAID = "UNPAID",
    PAID = "PAID",
    OVERDUE = "OVERDUE",
    CANCELLED = "CANCELLED",
}
  
export const InvoiceStatusDescriptions: Record<InvoiceStatusEnum, string> = {
    [InvoiceStatusEnum.DRAFT]: "Draft",
    [InvoiceStatusEnum.UNPAID]: "Unpaid",
    [InvoiceStatusEnum.PAID]: "Paid",
    [InvoiceStatusEnum.OVERDUE]: "Overdue",
    [InvoiceStatusEnum.CANCELLED]: "Cancelled",
};