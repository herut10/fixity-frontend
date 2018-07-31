var currThis = null
export {
  setCurrThis
}

function setCurrThis(that) {
  
  currThis = that
}


export default {
  title: "YOU ARE NOT LOGGED IN",
  text: 'Not being logged in prevents us from providing you with the best service that you deserve.',
  buttons: [{
      title: "Tell me more",
      handler: () => {

      }
    },
    {
      title: "Maybe next time"
    }
  ]
}