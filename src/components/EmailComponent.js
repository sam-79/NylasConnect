import { Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import { View, Text, ExpandableSection, Card, Colors, Avatar } from "react-native-ui-lib"
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
// import HTMLView from 'react-native-htmlview';
// import { WebView } from 'react-native-webview';
import { HomeStyles as styles } from '../screens/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { APP_SCREENS, COMPOSEMAIL } from '../constants';
const SCREENWIDTH = Dimensions.get("screen").width

const EmailComponent = ({ email }) => {
    const navigation = useNavigation();
    const { subject, date, body, grant_id, id } = email;
    const [expanded, setExpanded] = useState(true);
    const sender = email.from[0].email
    const receiver = email.to[0].email

    const { width } = useWindowDimensions();

    

    const SectionHeader = ({ }) => {
        return (
            // <Card flex left row containerStyle={{marginVertical:5, borderWidth:1, padding:10}} >
            //     {email.avatar ?
            //         <Image source={{ uri: email.avatar }} style={[styles.avatar,{width:60, height:60}]} />
            //         :
            //         <Avatar label={sender[0].toUpperCase()} size={60} />
            //     }
            //     {/* <Card.Section
            //     content={[{text: 'Card content here', text70: true, grey10: true}]}

            //     /> */}
            //     <View top>
            //         <Text>{sender}</Text>
            //     </View>
            // </Card>

            <View flex left padding-5>
                <View row>

                    {
                        email.avatar ?
                            <Image source={{ uri: email.avatar }} style={[styles.avatar, { width: 60, height: 60 }]} />
                            :
                            <Avatar label={sender[0].toUpperCase()} size={60} />
                    }
                    <View left centerV marginL-10>

                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.sender}>{sender}</Text>
                    </View>
                    <Pressable onPress={() => navigation.navigate(APP_SCREENS.EMAILCOMPOSE, {
                        source: COMPOSEMAIL.REPLY,
                        //sample email data
                        email: email
                    })}>
                        <MaterialCommunityIcons name='reply-outline' size={30} />
                    </Pressable>
                </View>
                {
                    expanded &&
                    <View padding-5 >
                        <Text style={styles.sender}>From: {sender}</Text>
                        <Text style={styles.receiver}>To: {receiver}</Text>
                        <Text style={styles.date}>Date: {date}</Text>
                    </View>

                }

            </View>
        )
    }

    return (
        <View flex>
            <Text style={[styles.subject, { fontSize: 24, fontWeight: 'bold' }]}>{subject}
                <MaterialCommunityIcons name="label" color={"red"} size={25} />
            </Text>

            <ExpandableSection
                expanded={expanded}
                sectionHeader={<SectionHeader />}
                onPress={() => setExpanded(!expanded)}
            >

                <View marginV-10>

                    <RenderHtml contentWidth={width} source={{ html: body }} />
                </View>
                {/* <HTMLView
                value={body}
            /> */}
                {/* <WebView
                // originWhitelist={['*']}
                source={{ html: body }}
            /> */}
                {/* {attachments.length > 0 && (
                <View style={styles.attachments}>
                    <Text style={styles.attachmentsTitle}>Attachments:</Text>
                    {
                        attachments.map((file, index) => {
                            <Card key={index} marginB-10>
                                <Card.Section
                                    content={[
                                        { text: file.name, text70: true, grey10: true },
                                        { text: file.size, text90: true, grey40: true }
                                    ]}
                                    style={{ padding: 10 }}
                                />
                                <Card.Actions>
                                    <Button onPress={() => Linking.openURL(file.url)}>Download</Button>
                                </Card.Actions>
                            </Card>
                        })
                    }
                </View>
            )} */}
            </ExpandableSection>
        </View>

    )
}

export default EmailComponent