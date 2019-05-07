using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class SendValue : MonoBehaviour
{
    public Network network;

    public Button ButtonClick;
    public Text inputBar;
    


    public void TaskOnClick()
    {
        network.SendValue(int.Parse(inputBar.text));
    }
}
