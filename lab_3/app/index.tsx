import { Link } from 'expo-router';
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
import { useStore } from '~/context/StoreContext';

const { width, height } = Dimensions.get('screen');

export default function Home() {
  const { score, dispatchTask } = useStore();

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
            dispatchTask({ type: 'ADD_CLICK_PROGRESS' });
          }}>
          <TapGestureHandler
            numberOfTaps={2}
            onEnded={() => {
              dispatchTask({ type: 'ADD_DOUBLE_CLICK_PROGRESS' });
            }}>
            <LongPressGestureHandler
              minDurationMs={3000}
              onEnded={() => {
                dispatchTask({ type: 'ADD_HOLD_PROGRESS' });
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
                  dispatchTask({ type: 'ADD_DRAG_PROGRESS' });
                }}>
                <FlingGestureHandler
                  direction={Directions.RIGHT}
                  onActivated={() => {
                    translateX.value = width / 3;
                  }}
                  onEnded={() => {
                    dispatchTask({ type: 'ADD_SWIPE_RIGHT_PROGRESS' });
                  }}>
                  <FlingGestureHandler
                    direction={Directions.LEFT}
                    onActivated={() => {
                      translateX.value = -width / 3;
                    }}
                    onEnded={() => {
                      dispatchTask({ type: 'ADD_SWIPE_LEFT_PROGRESS' });
                    }}>
                    <PinchGestureHandler
                      onBegan={() => {
                        oldScale.value = scale.value;
                      }}
                      onGestureEvent={(event) => {
                        scale.value = oldScale.value * event.nativeEvent.scale;
                      }}
                      onEnded={() => {
                        dispatchTask({ type: 'ADD_RESIZE_PROGRESS' });
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
