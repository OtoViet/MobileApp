import Svg, { Path } from 'react-native-svg';

export default function SteeringWheel() {
    return <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        height={100} width={100}
        style={{
            enableBackground: "new 0 0 32 32",
        }}
        xmlSpace="preserve"
    >
        <Path
            style={{
                fill: "#202C45",
            }}
            d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.836 0 16 0zm0 4c5.207 0 9.605 3.354 11.266 8H4.734C6.395 7.354 10.793 4 16 4zm0 14a2 2 0 1 1-.001-3.999A2 2 0 0 1 16 18zM4 16c5.465 0 9.891 5.266 9.984 11.797C8.328 26.828 4 21.926 4 16zm14.016 11.797C18.109 21.266 22.535 16 28 16c0 5.926-4.328 10.828-9.984 11.797z"
        />
    </Svg>
}