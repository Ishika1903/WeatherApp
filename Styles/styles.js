// styles.js
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  data: {
    marginTop: 10,
    fontSize: 16,
  },
  icon: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  error: {
    marginTop: 10,
    color: 'red',
  },

  settingsContainer: {
    flex: 1,
    padding: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  toggleLabel: {
    fontSize: 16,
  },
  aboutSection: {
    marginTop: 20,
  },
  aboutText: {
    fontSize: 14,
    color: '#555',
  },
  drawer: {
    backgroundColor: '#F1F6F9',
  },
  drawerText: {
    marginBottom: 10,
    color: '#9BA4B5',
    fontWeight: 'bold',
    fontSize: 20,
  },
  drawerBottom: {
    marginTop: 280,
    marginLeft: 150,
  },
  drawerBottomImage: {
    width: 20,
    height: 20,
  },

  screen1: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    fontSize: 40,
    marginTop: 20,
  },

  textTitle: {
    textAlign: 'center',
    fontSize: 40,
    marginLeft: 100,
  },
  plusIcon: {
    fontSize: 40,
    marginLeft: 10,
  },
});
