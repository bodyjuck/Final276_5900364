using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

using SocketIO;

public class Network : MonoBehaviour
{
    
    static SocketIOComponent socket;

    public Text message;

    public Text status;
    public Text youIndex;

    public string youID;

    public bool canSendValue;

    void Start()
    {
        socket = GetComponent<SocketIOComponent>();

        socket.On("open", OnConnected);

        socket.On("getResponMess", GetMessage);

        socket.On("getResponStatus", GetStatus);
        
        canSendValue = true;
    }

    private void OnConnected(SocketIOEvent obj)
    {
        //Debug.Log("conected");
        youIndex.text = "conected";

        JSONObject JSONobject = obj.data;
        string result = JSONobject["id"].str;

        youID = result;
        //Debug.Log("Your ID " + result);
        youIndex.text = "Your ID " + result;
    }




    private void GetMessage(SocketIOEvent obj)
    {
        JSONObject JSONobject = obj.data;
        string otherPlayerID = JSONobject["myID"].str;
        string otherPlayerNUM = JSONobject["myNum"].ToString();
        string otherPlayerStatus = JSONobject["status"].str;

        Debug.Log(JSONobject);
        Debug.Log(otherPlayerID);
        Debug.Log(otherPlayerNUM);
        Debug.Log(otherPlayerStatus);

        message.text = "Player ID " + otherPlayerID + " Input Num " + otherPlayerNUM + " " + otherPlayerStatus;

        if(otherPlayerStatus == "Win")
        {
            canSendValue = false;

            StartCoroutine(waitForNewRound());
        }
    }

    private void GetStatus(SocketIOEvent obj)
    {

        JSONObject JSONobject = obj.data;

        string result = JSONobject["myNum"].str;

        //Debug.Log(result);
        status.text = result;

        if(result == "You Win")
        {
            canSendValue = false;

            StartCoroutine(waitForNewRound());
        }
    }

    public void SendValue(int num)
    {
        if(canSendValue == true)
        {
            JSONObject JSONobject = new JSONObject(JSONObject.Type.OBJECT);
            JSONobject.AddField("myID",youID);
            JSONobject.AddField("myNum",num);
        

            socket.Emit("Check", JSONobject);
        }

    }

    public IEnumerator waitForNewRound()
    {
        yield return new WaitForSeconds(2.0f);

        status.text = "Wait For New Round";

        yield return new WaitForSeconds(2.0f);

        status.text = "New Random Num";

        yield return new WaitForSeconds(1.0f);

        status.text = "Les't Start";
        canSendValue = true;
    }
}
