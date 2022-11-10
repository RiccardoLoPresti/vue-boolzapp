const {createApp} = Vue;

let DateTime = luxon.DateTime;

createApp({
  data(){
    return{
      activeContact: 0,
      time:'',
      getNewMsg: '',
      nameContact:'',
      noMsg:'..non ci sono messaggi',
      isShow : false,
      answerArray:['Ok!','Grazie mille!','Arrivederci','Tutto bene?','Che si dice?','Ottimo!','Stasera ci vediamo?'],
      contacts: [
        {
          name: 'Michele',
          lastAccess: 'Ultimo accesso oggi alle 15:55',
          avatar: './img/avatar_1.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50',
              message: 'Ricordati di stendere i panni',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15',
              message: 'Tutto fatto!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Fabio',
          lastAccess: 'Ultimo accesso oggi alle 16:55',
          avatar: './img/avatar_2.jpg',
          visible: true,
          messages: [
            {
              date: '20/03/2020 16:30',
              message: 'Ciao come stai?',
              status: 'sent'
            },
            {
              date: '20/03/2020 16:30',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            {
              date: '20/03/2020 16:35',
              message: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
            }
          ],
        },
        {
          name: 'Samuele',
          lastAccess: 'Ultimo accesso oggi alle 16:55',
          avatar: './img/avatar_3.jpg',
          visible: true,
          messages: [
            {
              date: '28/03/2020 10:10',
              message: 'La Marianna va in campagna',
              status: 'received'
            },
            {
              date: '28/03/2020 10:20',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            },
            {
              date: '28/03/2020 16:15',
              message: 'Ah scusa!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Alessandro B.',
          lastAccess: 'Ultimo accesso oggi alle 16:00',
          avatar: './img/avatar_4.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50',
              message: 'Si, ma preferirei andare al cinema',
              status: 'received'
            }
          ],
        },
        {
          name: 'Alessandro L.',
          lastAccess: 'Ultimo accesso oggi alle 15:35',
          avatar: './img/avatar_5.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30',
              message: 'Ricordati di chiamare la nonna',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50',
              message: 'Va bene, stasera la sento',
              status: 'received'
            }
          ],
        },
        {
          name: 'Claudia',
          lastAccess: 'Ultimo accesso oggi alle 15:50',
          avatar: './img/avatar_6.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30',
              message: 'Ciao Claudia, hai novità?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50',
              message: 'Non ancora',
              status: 'received'
            },
            {
              date: '10/01/2020 15:51',
              message: 'Nessuna nuova, buona nuova',
              status: 'sent'
            }
          ],
        },
        {
          name: 'Federico',
          lastAccess: 'Ultimo accesso oggi alle 15:30',
          avatar: './img/avatar_7.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30',
              message: 'Fai gli auguri a Martina che è il suo compleanno!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50',
              message: 'Grazie per avermelo ricordato, le scrivo subito!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Davide',
          lastAccess: 'Ultimo accesso oggi alle 15:50',
          avatar: './img/avatar_8.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30',
              message: 'Ciao, andiamo a mangiare la pizza stasera?',
              status: 'received'
            },
            {
              date: '10/01/2020 15:50',
              message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:51',
              message: 'OK!!',
              status: 'received'
            }
          ],
        }
      ]
    }
  },
  methods:{
    changeContact(id){
      this.activeContact = id
    },
    printMsg(){
      if(this.getNewMsg == '') return
      const newMsg = {
        date: this.time,
        message: this.getNewMsg.charAt(0).toUpperCase() + this.getNewMsg.slice(1),
        status: 'sent'
      }
      this.contacts[this.activeContact].messages.push(newMsg);
      setTimeout(()=>{
        this.scrollToBottom();
      },0)
      this.getAnswer();
      this.getNewMsg='';
    },
    getAnswer(){
      const answer = this.getRandomAnswer()
      setTimeout(() => {
        const newReceivedMsg = {
          date: this.time,
          message: answer,//aumenteare il n risposte
          status: 'received'
        }
        this.contacts[this.activeContact].messages.push(newReceivedMsg)
      }, 2000);

      setTimeout(()=>{
        this.scrollToBottom();
      },2001)
    },
    scrollToBottom() {
      const el = document.getElementById('chatId');
      el.scrollTop = el.scrollHeight;
    },
    resultQuery(){
      if(this.nameContact){
      return this.contacts.filter((contact)=>{
        return this.nameContact.toLowerCase().split(' ').every(value => contact.name.toLowerCase().includes(value))
      })
    }else{
      return this.contacts;
    }
  },
    clearSearch(){
      this.nameContact= '';
    },
    deleteMsg(indexMsg){
      this.contacts[this.activeContact].messages.splice(indexMsg,1);
    },
    showCurtain(indexMsg){
        
      this.contacts[this.activeContact].messages.forEach((message)=>{
        if(message.isShow === true){
          message.isShow = false;
        }else return
        
      })
      
      this.contacts[this.activeContact].messages[indexMsg].isShow = !this.contacts[this.activeContact].messages[indexMsg].isShow
    
      /*if(this.contacts[this.activeContact].messages[indexMsg].isShow===true){
        this.contacts[this.activeContact].messages[indexMsg].isShow = false
        console.log('falso');
      }else{
        this.contacts[this.activeContact].messages[indexMsg].isShow = true
        console.log('vero');
      }*/
      

    },
    
    //NON VA 
    onClickOutside () {
      this.isShow = false
    },

    timeDateInterval (){
      setInterval(() => {
        const now = DateTime.now();
        return this.time = now.setLocale('it').toLocaleString(DateTime.TIME_24_SIMPLE);
      }, 1000);
    },
    getRandomAnswer(){
      return answer = this.answerArray[Math.floor(Math.random() * this.answerArray.length)];
    }
  },
  mounted(){
    this.contacts.forEach((element,index) => {
      element.id = index
    });
    this.timeDateInterval ()
    this.getRandomAnswer()
  }
}).mount('#app')