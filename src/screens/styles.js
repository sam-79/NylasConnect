import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { CUSTOM_MARGIN, themeColor } from "../constants";
const SCREENWIDTH = Dimensions.get("window").width;
const SCREENHEIGHT = Dimensions.get("window").height;
import { Colors } from "react-native-ui-lib";


export const AuthStyles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        // paddingTop: 50,
        padding: CUSTOM_MARGIN,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 36,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: "#2c2e3a",
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%"
    },
    BtnStyle: {
        backgroundColor: '#2c2e3a',
        borderRadius: 25,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        width: "100%"
    },
    TextStyle: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
});

//not used
export const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: CUSTOM_MARGIN/2,
        // paddingTop: StatusBar.currentHeight,
        // justifyContent: 'center',
        // paddingHorizontal: '1%',
        //alignContent: 'center',

    },
    headerContainer: {
        // position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50, // Increased height to accommodate rounded corners
        backgroundColor:themeColor.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // borderBottomLeftRadius: 30,
        // borderBottomRightRadius: 30,
        borderRadius: 30,
        marginVertical: CUSTOM_MARGIN / 2,
        elevation: 5, // More pronounced shadow
        zIndex: 1000, // Ensure it appears above other components
    },
    menuButton: {
        position: 'absolute',
        left: 10,
        padding: 10,
    },
    title: {
        // color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center'
    },

    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    header: {
        marginBottom: 15,
    },
    // subject: {
    //     fontSize: 25,
    //     fontWeight: 'bold',
    //     color: Colors.black,
    //     marginBottom: CUSTOM_MARGIN
    // },
    sender: {
        fontSize: 16,
    },
    date: {
        fontSize: 14,
        color: Colors.grey50,
        marginTop: 5,
    },
    attachments: {
        marginTop: 20,
    },
    attachmentsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black,
    },
    list: {
        flex: 1,
        backgroundColor: '#fff',
    },
    emailItem: {
        // flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        // alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    initials: {
        fontSize: 20
    },
    // emailContent: {
    //     flex: 1,
    // },
    subject: {
        fontSize: 14,
        color: '#333',
    },
    snippet: {
        fontSize: 12,
        color: '#777',
        marginTop: 3,
    },
    time: {
        fontSize: 12,
        color: '#999',
    },
});