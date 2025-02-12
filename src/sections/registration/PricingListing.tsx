import { m } from 'framer-motion';
// @mui
import { Box, Card, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useTheme } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';
import Scrollbar from '../../components/scrollbar';
import { TableHeadCustom } from '../../components/table';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'order', label: '#', align: 'center' },
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'roomType', label: 'Room Type', align: 'left' },
  { id: 'roomPrice', label: 'Room Price', align: 'left' },
  { id: 'servicePrice', label: 'Service Price', align: 'left' },
  { id: 'totalPrice', label: 'Total Price', align: 'left' },
];

const TABLE_DATA = [
  { order: 1, id: 'R001', roomType: 'Single', roomPrice: 500, servicePrice: 50, totalPrice: 550 },
  { order: 2, id: 'R002', roomType: 'Double', roomPrice: 700, servicePrice: 80, totalPrice: 780 },
  { order: 3, id: 'R003', roomType: 'Suite', roomPrice: 1200, servicePrice: 150, totalPrice: 1350 },
  { order: 4, id: 'R004', roomType: 'Deluxe', roomPrice: 900, servicePrice: 100, totalPrice: 1000 },
  { order: 5, id: 'R005', roomType: 'Single', roomPrice: 500, servicePrice: 50, totalPrice: 550 },
  { order: 6, id: 'R006', roomType: 'Double', roomPrice: 700, servicePrice: 80, totalPrice: 780 },
  { order: 7, id: 'R007', roomType: 'Suite', roomPrice: 1200, servicePrice: 150, totalPrice: 1350 },
  { order: 8, id: 'R008', roomType: 'Deluxe', roomPrice: 900, servicePrice: 100, totalPrice: 1000 },
  { order: 9, id: 'R009', roomType: 'Single', roomPrice: 500, servicePrice: 50, totalPrice: 550 },
  { order: 10, id: 'R010', roomType: 'Double', roomPrice: 700, servicePrice: 80, totalPrice: 780 },
];


// ----------------------------------------------------------------------


export default function PricingListing() {

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';


  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3" align="center">
          Pricing Listing
        </Typography>
      </m.div>

      <Typography variant="h5" align="center">
        Để đảm bảo thời gian đăng ký ở Ký túc xá trực tuyến, sinh viên chuẩn bị đầy đủ file hình sau:
      </Typography>

      <Typography variant="body2" align='center'>
        1. Tiền hồ sơ: 60.000 đồng/sinh viên.
        2. Tiền thế chân tài sản-cơ sở vật chất (TCTS-CSVC): 100.000 đồng/sinh viên. Sinh viên nhận lại tiền TCTS-CSVC đã đóng khi rời khỏi KTX.
        3. Bảo hiểm y tế: 1.105.650 đồng/sinh viên/15 tháng (dành cho tân sinh viên đóng BHYT tại KTX); 884.520 đồng/sinh viên/12 tháng (dành cho tân sinh viên Trường Đại học Công nghệ Thông tin).
        4. Bảo hiểm tai nạn: 30.000 đồng/sinh viên/12 tháng.
        5. Mức giá lệ phí phòng ở: căn cứ Công văn số 1593/ĐHQG-KHTC ngày 09/8/2022 của ĐHQG-HCM về “Quy định mức giá lệ phí phòng ở KTX từ năm học 2022-2023 đến năm học 2025-2026 và đơn giá dịch vụ”, Trung tâm thu lệ phí phòng ở và đơn giá dịch vụ tăng thêm như sau:
      </Typography>

      <Card>

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>

          <Scrollbar>
            <Table size={'medium'} sx={{ minWidth: 800 }}>
              <TableHeadCustom
                headLabel={TABLE_HEAD}
              // rowCount={tableData.length}
              />

              <TableBody>
                {TABLE_DATA.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{row.order}</TableCell>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.roomType}</TableCell>
                    <TableCell align="left">{row.roomPrice}</TableCell>
                    <TableCell align="left">{row.servicePrice}</TableCell>
                    <TableCell align="left">{row.totalPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Card>

      <Box>
        <Typography variant="h5" align="center">
          Ghi chú
        </Typography>

        <Typography variant="body2" align="center">
          - Đơn giá các phòng có dịch vụ tăng thêm (trang thiết bị tăng thêm) = đơn giá lệ phí phòng ở + đơn giá dịch vụ tăng thêm (trang thiết bị tăng thêm).
        </Typography>
        <Typography variant="body2" align="center">
          - Mức giá cho các loại phòng trên chưa bao gồm tiền sử dụng điện, nước và các dịch vụ khác.
        </Typography>
        <Typography variant="body2" align="center">
          - TTQLKTX thu tiền từng trang thiết bị tăng thêm theo thời gian hoàn thành lắp đặt. Đối với các trang thiết bị có sẵn sẽ thu cùng đợt sinh viên đăng ký; các trang thiết bị chưa lắp đặt còn lại theo loại phòng sẽ tính tiền từ ngày bàn giao cho sinh viên sử dụng và thu tiền sau khi hoàn thành lắp đặt xong tất cả các thiết bị tăng thêm còn lại cho sinh viên. Trường hợp sinh viên chuyển ra KTX nhưng các trang thiết bị tăng thêm vẫn chưa lắp đặt xong thì TTQLKTX sẽ chốt công nợ theo từng trang thiết bị hiện có.
        </Typography>
        <Typography variant="body2" align="center">
          - Sinh viên có nhu cầu đăng ký loại phòng có trang thiết bị lắp đặt thêm vui lòng liên hệ Ban Quản lý cụm nhà để được hỗ trợ.
        </Typography>
      </Box>
    </Stack>
  );
}

