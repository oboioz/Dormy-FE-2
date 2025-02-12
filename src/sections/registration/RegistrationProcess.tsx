import { m } from 'framer-motion';
// @mui
import { Box, Stack, Typography, useTheme } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function RegistrationProcess() {

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';


  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3">
          Registration Process
        </Typography>
      </m.div>

      <Typography variant="h5">
        Sinh viên khi thực hiện đăng ký ở ký túc xá vui lòng tìm hiểu kỹ các thông tin sau:
      </Typography>

      <Typography variant="body2">
        Thời gian thực hiện đăng ký tối đa 20 phút;
        Thời gian trả kết quả trong vòng 36 giờ tính từ khi đăng ký thành công.
      </Typography>
      <Box>
        <Typography variant="h6">
          1. Danh sách các trường đã ký thoả thuận với Ký túc xá năm học 2024 - 2025.
        </Typography>
      </Box>


      <Box>
        <Typography variant="h6">
          2.Thời gian ở KTX:
        </Typography>
        <Typography variant="body2">
          - Thời gian bắt đầu: 01/9/2024;
        </Typography>
        <Typography variant="body2">
          - Thời gian kết thúc: Sinh viên lựa chọn một trong ba mốc thời gian sau theo kế hoạch học tập của cá nhân;
        </Typography>
        <Box>
          <Typography variant="body2">
            - Ngày 30/6/2025;
          </Typography>
          <Typography variant="body2">
            - Ngày 31/7/2025;
          </Typography>
        </Box>
      </Box>


      <Box>
        <Typography variant="h6">
          3. Sinh viên đăng ký ở một học kỳ (từ ngày 01/9/2024 đến 31/01/2025): Trung tâm chỉ xem xét các trường hợp sau:
        </Typography>
        <Typography variant="body2">
          - Sinh viên có nhu cầu ở cả năm học 2024 - 2025 nhưng chỉ đóng tiền từng học kỳ: Sinh viên có hoàn cảnh khó khăn: Nộp đơn, sổ hộ nghèo/giấy xác nhận gia đình có hoàn cảnh khó khăn (còn thời hạn) hoặc trình bày rõ lý do; các trường hợp đặc biệt khác TTQLKTX căn cứ lý do cụ thể để hỗ trợ sinh viên. Sinh viên sắp xếp ở tại phòng cũ, nhà cũ (trong trường hợp thuộc diện chuyển phòng thì tuân thủ theo sự sắp xếp của Ban Quản lý cụm nhà).
        </Typography>
        <Typography variant="body2">
          - Sinh viên sắp tốt nghiệp: Nộp đơn và minh chứng (thời khoá biểu, lịch học) cho Ban Quản lý cụm nhà. Sinh viên được sắp xếp ở tại nhà E4, KTX Khu B.
        </Typography>
        <Typography variant="body2">
          - Các trường hợp đặc biệt khác: TTQLKTX căn cứ lý do cụ thể để xem xét, giải quyết.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6">
          4. Sau khi hoàn tất đăng ký, trong vòng 36 giờ, hệ thống sẽ gửi thông báo qua email của sinh viên. Sinh viên đăng nhập vào email đã đăng ký hoặc tài khoản cá nhân trên trang web:  sv.ktxhcm.edu.vn để thực hiện thanh toán online theo hướng dẫn.
        </Typography>
        <Typography variant="body2">
          a. Trường hợp ĐƯỢC duyệt: sinh viên thực hiện thanh toán theo hướng dẫn và trong thời gian 5 ngày kể từ khi được duyệt.
        </Typography>
        <Typography variant="body2">
          b. Trường hợp KHÔNG được duyệt: sinh viên liên hệ Hành chính toà nhà và thực hiện theo hướng dẫn.
        </Typography>
      </Box>

      <m.div variants={varFade().inUp}>
        <Typography variant="h6">Tổng đài hỗ trợ: 1900.055.559</Typography>
      </m.div>
    </Stack>
  );
}

