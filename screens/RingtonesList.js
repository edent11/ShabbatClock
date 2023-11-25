// import { Component, React } from 'react'
// import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView, Image, Pressable } from 'react-native';
// import { ringtones } from '../assets/ringtones/ringtones';



// class RingtonesList extends Component {



//     constructor() {
//         super();
//         this.ringtonesArray = ringtones;
//         this.checks = [];
//     }





//     renderRingtonesList() {
//         return this.ringtonesArray.map((ringtone, index) =>
//             <Pressable onPress={() => {
//                 ReactDOM.getElementsByTagName('Image').forEach(element => {
//                     console.log(element.id);

//                 })
//             }}>


//                 <View


//                     className='flex flex-row items-center justify-between content-between border-b-2 border-cyan-500'>
//                     {/* <Button
//                     onPress={() => this.handleOnPress(ringtone)}
//                     title={ringtone.name}
//                     color="#841584"
//                     accessibilityLabel="Learn more about this purple button"
//                     className='flex 1'
//                 /> */}
//                     <Text className="text-lg text-white">{ringtone.name}</Text>
//                     <Image
//                         id={"img" + index.toString()}
//                         source={require('../assets/images/check.png')}
//                         className={`w-10 h-10 hidden ${fdd}`}
//                     />

//                     {/* {this.checks.push()} */}


//                 </View>
//             </Pressable>
//         );



//     }


//     handleOnPress(movieDetails) {
//         alert(movieDetails.name);
//     }

//     render() {
//         return (

//             < SafeAreaView className={"flex h-full pt-8 dark:bg-black px-3"} >


//                 < ScrollView className="flex pt-1 mx-1" >
//                     <View className=' flex-1 h-full'>
//                         {
//                             this.ringtonesArray.length ? this.renderRingtonesList() : null
//                         }
//                     </View>

//                 </ScrollView >


//             </SafeAreaView >
//         );


//     }
// }
// // async function fillRingtonesArray() {


// //     ringtonesArray = ['.//assets/ringtones/alarm_clock_3.mp3', './/assets/ringtones/alarm_clock_3.mp3']


// //     return ringtonesArray;



// // }


// export default RingtonesList;