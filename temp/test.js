let D = require('../models/data')


const fs = require('fs/promises');

async function example() {
  try {
    const data = await fs.readFile('a.csv', { encoding: 'utf8' });
    console.log(data)

    let r = data.split('\r\n')

    let dispo = ['service_code','tarif_service_prix','tarif_id']

    let data_to_insert = []
    let tmp_d = [], tmp_l = {}

    for (let i = 0; i < r.length; i++) {
        tmp_d = r[i].split(';')
        tmp_l = {}
        
        for (let j = 0; j < dispo.length; j++) {
            if(dispo[j]){
                if(dispo[j] == 'tarif_id'){
                  tmp_l[dispo[j]] = '7'
                }else{
                    tmp_l[dispo[j]] = tmp_d[j]
                }
            }
        }

        data_to_insert.push(tmp_l)
    }
    let list_data_n  = Object.keys(data_to_insert[0])
    console.log(data_to_insert)

    //test d'insertion de don
    for (let i = 0; i < data_to_insert.length; i++) {
        await D.set('tarif_service',data_to_insert[i])
    }

  } catch (err) {
    console.log(err);
  }
}
example();
