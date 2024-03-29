import GHeader from 'library/common/GHeader';
import GScreen from 'library/wrapper/GScreen';
import React from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';

export default function PlannerListScreen() {
  const renderPlanner = ({planId, index}) => {
    return <PlannerListItem planId={planId} key={index.toString()} />;
  };
  return (
    <GScreen>
      <GHeader ScreenTitle={'Planner'} />
      <View>
        <FlatList renderItem={renderPlanner} />
      </View>
    </GScreen>
  );
}
const PlannerListItem = ({planId}) => {
  return (
    <View>
      <Pressable>
        <View>
          <View>
            <Text>Ref :</Text>
            <Text>Rockey Launda</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
