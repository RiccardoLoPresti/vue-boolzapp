const {createApp} = Vue;

let DateTime = luxon.DateTime;


function timeDateInterval (){
  setInterval(() => {
    const now = DateTime.now();
    return time = now.setLocale('it').toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
    //console.log(time);
  }, 1000);
}


createApp({
  data(){
    return{
      activeContact: 0,
      getNewMsg: '',
      nameContact:'',
      noMsg:'non ci sono messaggi',
      isShow : false,
      contacts: [
        {
          name: 'Michele',
          lastAccess: 'Ultimo accesso oggi alle 15:55',
          avatar: './img/avatar_1.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati di stendere i panni',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
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
              date: '20/03/2020 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent'
            },
            {
              date: '20/03/2020 16:30:55',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            {
              date: '20/03/2020 16:35:00',
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
              date: '28/03/2020 10:10:40',
              message: 'La Marianna va in campagna',
              status: 'received'
            },
            {
              date: '28/03/2020 10:20:10',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            },
            {
              date: '28/03/2020 16:15:22',
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
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
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
              date: '10/01/2020 15:30:55',
              message: 'Ricordati di chiamare la nonna',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
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
              date: '10/01/2020 15:30:55',
              message: 'Ciao Claudia, hai novità?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Non ancora',
              status: 'received'
            },
            {
              date: '10/01/2020 15:51:00',
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
              date: '10/01/2020 15:30:55',
              message: 'Fai gli auguri a Martina che è il suo compleanno!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
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
              date: '10/01/2020 15:30:55',
              message: 'Ciao, andiamo a mangiare la pizza stasera?',
              status: 'received'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:51:00',
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
      const newMsg = {
        date: '',
        message: this.getNewMsg.charAt(0).toUpperCase() + this.getNewMsg.slice(1),
        status: 'sent'
      }
      this.contacts[this.activeContact].messages.push(newMsg)
      this.getAnswer();
      this.getNewMsg='';
    },
    getAnswer(){
      setTimeout(() => {
        const newReceivedMsg = {
          date: '',
          message: 'Ok!',//aumenteare il n risposte
          status: 'received'
        }
        this.contacts[this.activeContact].messages.push(newReceivedMsg)
      }, 1000);
    },
    
    /*non va
   /*autoScroll(){
      setTimeout(() => {
        this.scrollToBottom()
      }, 1100);
    },
    scrollToBottom() {
      const el = document.getElementById('chatId');
      el.scrollTop = el.scrollHeight;
    },
    */

    resultQuery(){
      if(this.nameContact){
        console.log(this.nameContact);
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
      if(this.contacts[this.activeContact].messages.length == 0){
        this.contacts[this.activeContact].messages = [];
      }
      console.log(this.contacts[this.activeContact].messages.length);
    },
    showCurtain(indexMsg){
      this.contacts[this.activeContact].messages[indexMsg].isShow 
      = 
      !this.contacts[this.activeContact].messages[indexMsg].isShow 
    },

    //NON VA DC
    /*onClickOutside () {
      this.isShow = false
      console.log(this.isShow);
    },
    */
   
  },
  mounted(){
    this.contacts.forEach((element,index) => {
      element.id = index
    });
  }
}).mount('#app')