import { View, ScrollView } from 'react-native';
import { Headline, Paragraph, Title } from 'react-native-paper';
import StyleCommon from '../../theme/StyleCommon';
import Carousel from '../../components/Carousel/CarouselCards';
import CarouselCustomerSaid from '../../components/Carousel/CarouselCardsCustomerSaid';
import ExternalWashing from '../../components/Svg/externalWashing';
import CleanWashing from '../../components/Svg/cleanWashing';
import OilService from '../../components/Svg/oilService';
import CarSetting from '../../components/Svg/carSetting';
import SteeringWheel from '../../components/Svg/steeringWheel';
import VacuumCleaner from '../../components/Svg/vacuumCleaner';
import SeatCar from '../../components/Svg/seatCar';
import CounterUp from '../../components/CounterUp';
import Card from '../../components/Card';
import Employees from '../../assets/team-1.jpg';
import Employees1 from '../../assets/team-2.jpg';
import Employees2 from '../../assets/team-3.jpg';

export default function HomeScreen({ route, navigation }) {
  // const data = route.params;
  return (
    <ScrollView>
      <View style={StyleCommon.FlexCenter}>
        <Carousel />
      </View>
      <View style={StyleCommon.FlexCenter}>
        <Headline style={{ marginTop: 20, marginBottom: 10 }}>VỀ CHÚNG TÔI</Headline>
        <Paragraph style={StyleCommon.ParagraphTextJustify}>
          OtoViet là chuỗi rửa xe và chăm sóc xe thân thiện với môi trường đầu tiên tại Việt Nam. Chúng tôi luôn đặt sự tin cậy của khách hàng lên hàng đầu. Hàng ngàn khách hàng hài lòng tại Cần Thơ bởi hệ thống máy rửa xe tự động tiện lợi cùng với các dịch vụ chăm sóc xe như đánh bóng xe, vệ sinh khoang máy, nội thất chuyên nghiệp. Ngoài việc làm toả sáng cho chiếc xe của bạn chúng tôi còn giúp cho khách hàng tiết kiệm thời gian tối đa. Đây chính xác là những gì OtoViet đang hướng đến để làm sạch, chăm sóc, bảo vệ xe ô tô của bạn với chất lượng hàng đầu cùng với giá thành cạnh tranh.
        </Paragraph>

        <Headline style={{ marginTop: 20, marginBottom: 40 }}>TỔNG QUAN DỊCH VỤ</Headline>
        <ExternalWashing />
        <Title style={StyleCommon.HeaderRed}>
          Rửa bên ngoài
        </Title>
        <Paragraph style={StyleCommon.ParagraphTextCenter}>
          Phương pháp rửa xe tại OtoViet cam kết chất lượng, loại bỏ bụi bẩn, sình lầy bám trên xe
        </Paragraph>

        <OilService />
        <Title style={StyleCommon.HeaderRed}>
          Thay dầu/nhớt
        </Title>
        <Paragraph style={StyleCommon.ParagraphTextCenter}>
          Chúng tôi cũng cung cấp dịch vụ thay dầu nhớt xe chất lượng với giá cả cạnh tranh
        </Paragraph>

        <CleanWashing />
        <Title style={StyleCommon.HeaderRed}>
          Làm bóng
        </Title>
        <Paragraph style={StyleCommon.ParagraphTextCenter}>
          Sau khi rửa xe bạn chúng tôi sẽ lau khô xe bạn thay vì dùng vòi xịt cao áp
        </Paragraph>

        <CarSetting />
        <Title style={StyleCommon.HeaderRed}>
          Kiểm tra xe
        </Title>
        <Paragraph style={StyleCommon.ParagraphTextCenter}>
          Nhân viên của chúng tôi sẽ kiểm tra sơ bộ tình trạng xe và cho bạn biết tình trạng xe hiện tại
        </Paragraph>

        <VacuumCleaner />
        <Title style={StyleCommon.HeaderRed}>
          Hút bụi
        </Title>
        <Paragraph style={StyleCommon.ParagraphTextCenter}>
          Chúng tôi sẽ hút sạch bụi trước khi vệ sinh để hạn chế bụi bay
        </Paragraph>

        <SteeringWheel />
        <Title style={StyleCommon.HeaderRed}>
          Kiểm tra phanh
        </Title>
        <Paragraph style={StyleCommon.ParagraphTextCenter}>
          Khi bạn dùng dịch vụ chúng tôi sẽ kiểm tra miễn phí phanh xe cho bạn
        </Paragraph>

        <SeatCar />
        <Title style={StyleCommon.HeaderRed}>
          Vệ sinh yên xe
        </Title>
        <Paragraph style={StyleCommon.ParagraphTextCenter}>
          Chúng tôi sẽ hút bụi và vệ sinh khử mùi cho yên xe của bạn trông như mới
        </Paragraph>

        <CounterUp value={9} />
        <Title>Cửa hàng</Title>
        <CounterUp value={30} />
        <Title>Nhân viên</Title>
        <CounterUp value={1500} />
        <Title>Khách hàng hài lòng</Title>
        <CounterUp value={5000} />
        <Title>Lượt phục vụ</Title>

        <Headline style={{ marginTop: 20, marginBottom: 10 }}>DANH SÁCH NHÂN VIÊN</Headline>
      </View>
      <Card.Origin srcImage={Employees} title="Huỳnh Thanh Phong"/>
      <Card.Origin srcImage={Employees1} title="Trần Văn Nhẫn"/>
      <Card.Origin srcImage={Employees2} title="Nguyễn Thiện Hải"/>
      <View style={StyleCommon.FlexCenter}>
        <Headline style={{ marginTop: 50, marginBottom: 10 }}>KHÁCH HÀNG ĐÃ NÓI GÌ?</Headline>
        <CarouselCustomerSaid />
      </View>
    </ScrollView>
  );
}