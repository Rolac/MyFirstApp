import {
    StyleSheet,
    Text,
    View,
    Pressable
} from 'react-native';


function GoalItem(props) {
    return (
        /* Si usa l'oggetto Pressable per definire un oggetto che sia cliccabile */
        /* bind() è una funzione js che consente di preconfigurare una funzione per l'esecuzione. */
        /* Per lo stile dell'animazione su android esiste android_ripple per contornare l'oggetto.*/
        /* Per lo stile di iOS invece si puo usare una arrow function con lo stile sul pressed.*/
        <View style={styles.goalItem}>
            <Pressable
                android_ripple={{ color: '#210644' }}
                onPress={props.onDeleteItem.bind(this, props.id)}
                style={({ pressed }) => pressed && styles.pressedItem}>
                <Text style={styles.goalText}>{props.text}</Text>
            </Pressable>
        </View>
    );
}

export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
    },
    pressedItem: {
        opacity: 0.5,
    },
    goalText: {
        padding: 8,
        color: 'white',
    },
})
