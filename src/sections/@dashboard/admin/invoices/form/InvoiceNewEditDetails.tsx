import React, { useState, useEffect } from "react";
import sum from "lodash/sum";
// @mui
import {
  Box,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { fCurrency } from "../../../../../utils/formatNumber";
import { GetInitialInvoiceItemCreationResponseModel } from "../../../../../models/responses/InvoiceResponseModels";
import { toast } from "react-toastify";
import { httpClient } from "../../../../../services";
import { GetInitialInvoiceCreationRequestModel } from "../../../../../models/requests/InvoiceRequestModels";
import { getMonth, getYear } from "date-fns";
import { useFormContext } from "react-hook-form";

export type InvoiceNewEditDetailsProps = {
  items: GetInitialInvoiceItemCreationResponseModel[];
  setItems: React.Dispatch<React.SetStateAction<GetInitialInvoiceItemCreationResponseModel[]>>;
}

export default function InvoiceNewEditDetails({items, setItems} : InvoiceNewEditDetailsProps) {
  // const [items, setItems] = useState<
  //   GetInitialInvoiceItemCreationResponseModel[]
  // >([]);
  const [discount, setDiscount] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { control, setValue, watch, resetField } = useFormContext();

  const values = watch();

  useEffect(() => {
    const totalOnRow = items.map((item) => {
      const quantity = item.quantity || 0; // Default to 0 if undefined
      const cost = item.cost || 0; // Default to 0 if undefined
      return quantity * cost;
    });

    console.log("totalOnRow:", totalOnRow);

    const calculatedTotalPrice =
      sum(totalOnRow) - (discount || 0) + (taxes || 0); // Default discount and taxes to 0
    setTotalPrice(calculatedTotalPrice);
  }, [items, discount, taxes]);

  const fetchgetInitialInvoiceCreation = async () => {
    const payload: GetInitialInvoiceCreationRequestModel = {
      month: getMonth(values?.invoiceMonthYear) + 1,
      year: getYear(values?.invoiceMonthYear),
      roomId: values?.invoiceTo?.roomId, // Replace with actual roomId
    };
    const response = await httpClient.invoiceService.getInitialInvoiceCreation(
      payload
    );

    if (response) {
      setItems(response.roomServices);
    } else {
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    if (values?.invoiceTo?.roomId && values?.invoiceMonthYear) {
      fetchgetInitialInvoiceCreation();
    } else {
      // resetField("items");
    }
  }, [values?.invoiceTo?.roomId, values?.invoiceMonthYear]);

  const handleChange = <
    K extends keyof GetInitialInvoiceItemCreationResponseModel
  >(
    index: number,
    field: K,
    value: GetInitialInvoiceItemCreationResponseModel[K]
  ) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === "oldIndicator" || field === "newIndicator") {
      const oldIndicator = Number(updatedItems[index].oldIndicator) || 0;
      const newIndicator = Number(updatedItems[index].newIndicator) || 0;
      const quantity = newIndicator - oldIndicator;
      if (quantity >= 0) {
        updatedItems[index].quantity = newIndicator - oldIndicator;
        updatedItems[index].total =
          (newIndicator - oldIndicator) * updatedItems[index].cost;
      }
    }

    if (field === "quantity" || field === "cost") {
      updatedItems[index].total =
        updatedItems[index].quantity * updatedItems[index].cost;
    }

    setItems(updatedItems);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: "text.disabled", mb: 3 }}>
        Details:
      </Typography>

      <Stack
        divider={<Divider flexItem sx={{ borderStyle: "dashed" }} />}
        spacing={3}
      >
        {items.map((item, index) => (
          <Stack key={index} spacing={1}>
            {/* First Line: Service Name, Unit, Cost */}
            <Grid container spacing={2} sx={{ width: 1, marginLeft: 0.1 }}>
              {/* Service Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  size="small"
                  name={`items[${index}].roomServiceName`}
                  label="Service Name"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={item.roomServiceName || ""}
                  onChange={(e) =>
                    handleChange(index, "roomServiceName", e.target.value)
                  }
                />
              </Grid>

              {/* Unit + Cost */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  {/* Unit */}
                  <Grid item xs={6}>
                    <TextField
                      size="small"
                      name={`items[${index}].unit`}
                      label="Unit"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      value={item.unit || ""}
                      onChange={(e) =>
                        handleChange(index, "unit", e.target.value)
                      }
                    />
                  </Grid>

                  {/* Cost */}
                  <Grid item xs={6}>
                    <TextField
                      size="small"
                      type="number"
                      name={`items[${index}].cost`}
                      label="Cost"
                      placeholder="0"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      value={item.cost || ""}
                      onChange={(e) =>
                        handleChange(index, "cost", Number(e.target.value))
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Second Line: Old Indicator, New Indicator, Quantity, Total */}
            <Grid container spacing={2} sx={{ width: 1 }}>
              {item.isServiceIndicatorUsed && (
                <Grid item xs={12} md={3}>
                  <TextField
                    size="small"
                    type="number"
                    name={`items[${index}].oldIndicator`}
                    label="Old Indicator"
                    placeholder="0"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={item.oldIndicator || ""}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "oldIndicator",
                        Number(e.target.value)
                      )
                    }
                  />
                </Grid>
              )}

              {item.isServiceIndicatorUsed && (
                <Grid item xs={12} md={3}>
                  <TextField
                    size="small"
                    type="number"
                    name={`items[${index}].newIndicator`}
                    label="New Indicator"
                    placeholder="0"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={item.newIndicator || ""}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "newIndicator",
                        Number(e.target.value)
                      )
                    }
                  />
                </Grid>
              )}

              {/* Quantity */}
              <Grid item xs={12} md={item.isServiceIndicatorUsed ? 3 : 6}>
                <TextField
                  size="small"
                  type="number"
                  name={`items[${index}].quantity`}
                  label="Quantity"
                  placeholder="0"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={item.quantity || ""}
                  disabled={item.isServiceIndicatorUsed}
                  onChange={(e) =>
                    handleChange(index, "quantity", Number(e.target.value))
                  }
                />
              </Grid>

              {/* Total */}
              <Grid item xs={12} md={item.isServiceIndicatorUsed ? 3 : 6}>
                <TextField
                  size="small"
                  type="number"
                  name={`items[${index}].total`}
                  label="Total"
                  placeholder="0"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={item.total || ""}
                  disabled
                />
              </Grid>
            </Grid>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: "dashed" }} />

      <Stack spacing={2} sx={{ mt: 3 }}>
        <Stack direction="row" justifyContent="flex-end">
          <Typography variant="h6">Total price :</Typography>
          <Typography variant="h6" sx={{ textAlign: "right", width: 120 }}>
            {fCurrency(totalPrice) || "-"}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
