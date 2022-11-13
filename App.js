import { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Button
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [theGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { text: enteredGoalText, id: Math.random().toString() }]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      /* Il filter restituirà un nuovo array, che è il vecchio array meno tutti gli elementi filtrati. */
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }


  return (
    /* Questo simbolo indica un fragment */
    <>
      {/* La StatusBar serve per modifica la barra di stato in alto per cambiarne il colore*/}
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title='Add new Goal'
          color="#a065ec"
          onPress={startAddGoalHandler} />
        {/* Usiamo la modale per mostrare l'input o meno tramite un bottone */}
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />

        { /* 
      <ScrollView>
        {theGoals.map((goal) => (
               Ho applicato lo stile alla view e non al text poiché iOS altrimenti non prende alcune modifiche, 
              vedi il bordo arrotondato. Se applichiamo il colore del testo alla view però non viene preso dal testo 
              <View style={styles.goalItem} key={goal}>
                <Text style={styles.goalText}>{goal}</Text>
              </View>
            ))}
      </ScrollView>
      */ }

        <View style={styles.goalsContainer}>
          {/* Preferiamo usare la FlatList in liste dinamiche in quanto questa renderizza solo gli item visibili (+ qualcuno sopra e sotto) 
            A differenza della ScrollView però non serve eseguire il mapping per iterare gli items, 
            ma questo viene demandato alla FlatList usando l'attributo 'data' e 'renderItem'. La property 'key' viene automaticamente letta dalla FlatList, 
            altrimenti usare il 'keyExtractor' per estrarre la chiave anche se non si chiama key.*/}
          <FlatList
            data={theGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}>
          </FlatList>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },

  goalsContainer: {
    flex: 4,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
