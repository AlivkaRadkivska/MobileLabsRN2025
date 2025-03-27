import { Link } from 'expo-router';
import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

export default function Home() {
  const [score, setScore] = useState(0);

  const oldTranslateX = useSharedValue(0);
  const oldTranslateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const oldScale = useSharedValue(1);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View>
      <View>
        <Link className="z-50 text-center text-2xl font-bold text-blue-500 underline" href="/tasks">
          Завдання {score}
        </Link>
      </View>
      <View className="items-center justify-center">
        <TapGestureHandler
          onEnded={() => {
            setScore((prev) => prev + 1);
          }}>
          <TapGestureHandler
            numberOfTaps={2}
            onEnded={() => {
              setScore((prev) => prev + 2);
            }}>
            <LongPressGestureHandler
              minDurationMs={3000}
              onEnded={() => {
                setScore((prev) => prev + 3);
              }}>
              <PanGestureHandler
                minPointers={2}
                minDist={50}
                onBegan={() => {
                  oldTranslateX.value = translateX.value;
                  oldTranslateY.value = translateY.value;
                }}
                onGestureEvent={(event) => {
                  translateX.value = oldTranslateX.value + event.nativeEvent.translationX;
                  translateY.value = oldTranslateY.value + event.nativeEvent.translationY;
                }}
                onEnded={() => {
                  setScore((prev) => prev + 10);
                }}>
                <FlingGestureHandler
                  direction={Directions.RIGHT}
                  onActivated={() => {
                    translateX.value = width / 3;
                  }}
                  onEnded={() => {
                    setScore((prev) => prev + 5);
                  }}>
                  <FlingGestureHandler
                    direction={Directions.LEFT}
                    onActivated={() => {
                      translateX.value = -width / 3;
                    }}
                    onEnded={() => {
                      setScore((prev) => prev + 5);
                    }}>
                    <PinchGestureHandler
                      onBegan={() => {
                        oldScale.value = scale.value;
                      }}
                      onGestureEvent={(event) => {
                        scale.value = oldScale.value * event.nativeEvent.scale;
                      }}
                      onEnded={() => {
                        setScore((prev) => prev + 5);
                      }}>
                      <Animated.View
                        className="h-[150px] w-[150px] rounded bg-red-800"
                        style={animatedStyle}
                      />
                    </PinchGestureHandler>
                  </FlingGestureHandler>
                </FlingGestureHandler>
              </PanGestureHandler>
            </LongPressGestureHandler>
          </TapGestureHandler>
        </TapGestureHandler>
      </View>
    </View>
  );
}
