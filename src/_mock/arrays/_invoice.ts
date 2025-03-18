import { add, subDays } from "date-fns";
import { IInvoice, IInvoiceItem } from "../../@types/invoice";
import { IRoom } from "../../@types/room";
import _mock from "../_mock";
import { randomInArray, randomNumberRange } from "../utils";

// Generate mock rooms
const _mockRooms: IRoom[] = [...Array(5)].map((_, index) => ({
  roomID: index + 1,
  roomNumber: `A10${index + 1}`,
  floor: randomNumberRange(1, 5),
  capacity: randomNumberRange(2, 6),
  occupied: randomNumberRange(1, 5),
}));

export const _invoices: IInvoice[] = [...Array(20)].map((_, index) => {
  const invoiceItems: IInvoiceItem[] = [...Array(3)].map((__, itemIndex) => ({
    invoiceItemId: _mock.id(itemIndex),
    serviceId: itemIndex + 1,
    serviceName: randomInArray([
      "Electricity",
      "Water",
      "Internet",
      "Cleaning Service",
      "Maintenance Fee",
    ]),
    cost: _mock.number.price(itemIndex),
    quantity: randomNumberRange(1, 5),
    unit: randomInArray(["kWh", "m³", "month", "service"]),
    metadata: { provider: randomInArray(["EVN", "Local Water Supply", "ISP"]) },
    invoiceId: {} as IInvoice, // Will be assigned later
  }));

  const invoice: IInvoice = {
    invoiceID: index + 1,
    invoiceName: `Monthly Bill ${index + 1}`,
    dueDate: add(new Date(), { days: index + 15, hours: index }),
    amountBeforePromotion: _mock.number.price(index + 1),
    amountAfterPromotion: _mock.number.price(index + 1) - 10,
    status: randomInArray(["paid", "unpaid", "overdue", "draft"]),
    createdAt: subDays(new Date(), index).toISOString(),
    type: "utility",
    month: 2,
    year: 2025,
    roomId: randomInArray(_mockRooms),
    description: "Monthly utility bill for dorm room",
    invoiceItems: invoiceItems,
  };

  // Assign invoice reference to invoice items
  invoiceItems.forEach((item) => (item.invoiceId = invoice));

  return invoice;
});

export const _mockRoomsList = _mockRooms;

export const _invoiceAddressTo = [...Array(16)].map((_, index) => ({
  id: _mock.id(index + 1),
  name: _mock.name.fullName(index + 1),
  email: _mock.email(index + 1),
  phone: _mock.phoneNumber(index + 1),
}));
