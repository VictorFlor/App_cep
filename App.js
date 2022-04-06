import react, {useState, useRef} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard
} from 'react-native';

import api from './src/api/api';


export default function App() {

  const [cep, setCep] = useState('');
  const [cepUser, setCepUser] = useState('');
  const inputRef = useRef(null);


  function limpar(){
    setCep('');
    inputRef.current.focus();
  }

  async function buscar(){
    if(cep == '' ){

      alert('Informe um CEP valido');
      setCep('');
      return;

    }

    try{

      const response = await api.get(`${cep}/json`);
      Keyboard.dismiss();
      setCepUser(response.data);

    }catch{

      alert('Informe um CEP valido');
      setCep('');

    }
    
  }

  return (
    <SafeAreaView style={styles.container}>

      <View>
        
        <Text style={styles.txt}>Informe seu CEP:</Text>
        <TextInput
          style={styles.input}
          placeholder='Informe sem a vírgula. Ex.: 69090300'
          value={cep}
          onChangeText={(texto) => setCep(texto) }
          keyboardType= 'numeric'
          ref={inputRef}
        />

        <View style={styles.areaBtn}> 
          
          <TouchableOpacity 
            style={[styles.btn , {backgroundColor: '#D4AC0D'}]}
            onPress={buscar}
          >
            <Text style={styles.btnTxt}>Buscar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.btn , {backgroundColor: '#1F618D'} ]}
            onPress={limpar}
          >
            <Text style={styles.btnTxt}>Limpar</Text>
          </TouchableOpacity>

        </View>
        
      </View>

      <View style={styles.infLocalização}>
        <Text style={styles.infLocalizaçãoTxt} >CEP: {cepUser.cep} </Text>
        <Text style={styles.infLocalizaçãoTxt} >Logradouro: {cepUser.logradouro} </Text>
        <Text style={styles.infLocalizaçãoTxt} >Complemento: {cepUser.complemento} </Text>
        <Text style={styles.infLocalizaçãoTxt} >Bairro: {cepUser.bairro} </Text>
        <Text style={styles.infLocalizaçãoTxt} >Localidade: {cepUser.localidade} </Text>
        <Text style={styles.infLocalizaçãoTxt} >Uf: {cepUser.uf} </Text>
      </View>

    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10
  },
  input:{
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 20,
    width: '90%'
  },
  areaBtn:{
    flexDirection:'row',
    height: 50,
    justifyContent: 'space-between',
    marginTop: 20,

  },
  btn:{
    borderRadius: 10,
    padding: 10,
    height: 50,

  },
  btnTxt:{
    fontSize:20,
    fontWeight: 'bold',
    textAlign:'center',
    color: '#fff'
  },
  infLocalização:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infLocalizaçãoTxt:{
    fontSize:15,
  }

});
