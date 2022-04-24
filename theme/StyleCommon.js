import {
    StyleSheet,
    StatusBar,
    Dimensions
} from 'react-native';
const StyleCommon = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    MarginStatusBar: {
        marginTop: StatusBar.currentHeight
    },
    Form: {
        margin: 20,
    },
    TextInput: {
        borderRadius: 10,
    },
    LogoImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
    },
    CarouselContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: Math.round((Dimensions.get('window').width + 80) * 0.7),
        paddingBottom: 40,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    CarouselImageContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: Math.round((Dimensions.get('window').width + 80) * 0.7),
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    CarouselImage: {
        width: Math.round((Dimensions.get('window').width + 80) * 0.7),
        height: 200,
        borderRadius: 8
    },
    CarouselHeader: {
        color: "#E81C2E",
        fontSize: 28,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 20,
        textAlign: "center"
    },
    CarouselBody: {
        color: "#222",
        fontSize: 18,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: "center"
    },
    FlexCenter:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    ParagraphTextCenter: {
        textAlign: 'center', 
        marginLeft:16, 
        marginRight:16
    },
    ParagraphTextJustify:{
        textAlign: 'justify', 
        marginLeft:16, 
        marginRight:16
    },
    HeaderRed:{
        color: '#E81C2E',
    },
    ButtonCenter: {
        flex:1, 
        justifyContent: 'center'
    },
    TextInputMarginVertical:{
        marginVertical: 10
    },
    marginHorizontalDefault:{
        marginHorizontal: 20
    }
});
export default StyleCommon;