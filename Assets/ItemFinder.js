#pragma strict

private var PICKUP_RANGE : float = 2.0f;
private var cur_distance : float[] = new float[2];

private var itemInRange : GameObject;
private var msg : String = "";
public var HUDTest : GUIStyle;

private var waitToDeleteMsg : float = 0.0f;
private var MSG_DURATION : float = 5.0f;
private var tar_name = "";

private var tar_type : Object; 

function Start () {

}

function Update () {


	if(itemInRange != null){
		if(Mathf.Abs( itemInRange.transform.position.x - this.transform.position.x)  <= PICKUP_RANGE
		 && Mathf.Abs( itemInRange.transform.position.z - this.transform.position.z) < PICKUP_RANGE){
		 	if(tar_type == "item"){
				msg = "PRESS Q to pick up this item.";
				if(Input.GetKeyDown("q")){				//	pickup an item
					itemInRange.gameObject.GetComponent.<Item>().PickedUp();
					waitToDeleteMsg = MSG_DURATION;
			}
			}else if (tar_type == "door"){
				msg = "PRESS Q to open the door.";
				if(Input.GetKeyDown("q")){				// open a door
					itemInRange.gameObject.GetComponent.<Door>().ChangeState();
				}
			}
			
		}else if(Mathf.Abs( itemInRange.transform.position.x - this.transform.position.x)  <= PICKUP_RANGE * 10.0f
		 && Mathf.Abs( itemInRange.transform.position.z - this.transform.position.z) < PICKUP_RANGE * 10.0f){
			msg = "There is something near from here...";
				if(Input.GetKeyDown("z")){
				this.gameObject.GetComponent.<SoldierController>().RunToItem(itemInRange);
			}
		}else{
			itemInRange = null;
		}
	}else if(waitToDeleteMsg > 0.0f){
		msg = "You Got " + tar_name + ".";
		waitToDeleteMsg -= 0.1f;
		Debug.Log(waitToDeleteMsg);
		if(waitToDeleteMsg <= 0.0f){
			msg = "";
		}
	}else{
		msg = "";
	}
}

public function Find(obj : GameObject){
	
	tar_type = obj.tag;
	itemInRange = obj;
	tar_name = obj.gameObject.name;
}

function OnGUI(){
	GUI.Box( new Rect(0, 0, Screen.width, Screen.height), msg, HUDTest);
}
