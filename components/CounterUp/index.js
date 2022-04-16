import { CountUp } from 'use-count-up';
import { Headline, Title } from 'react-native-paper';
export default function CounterUp(props) {
    const onComplete = () => {
        // do your stuff here
        return { shouldRepeat: true, delay: 20 }
    }
    return <Headline style={{color: '#E81C2E', fontWeight: 'bold',
    fontSize:40, lineHeight: 30, paddingTop:30}}>
        <CountUp isCounting end={props.value}
            start={0}
            duration={3.2}
            easing="linear"
            onComplete={onComplete} />
    <Title style={{fontSize:40}}>+</Title>
    </Headline>
}