#pragma strict

private var STATE =  {"OPEN" : 0, "CLOSE" : 1, "OPENING" : 2, "CLOSING" : 3 };
private var cur_state : Object = STATE["CLOSE"];

private var OPEN_SPEED : float = 5.0f;
private var MAX_EULER_Y : float = 120.0f;

private var default_rotation : float;
function Start () {
	default_rotation = this.transform.parent.transform.eulerAngles.y;
}

function Update () {
	if(cur_state == STATE["OPENING"]){
		if( Mathf.Abs ( this.transform.parent.transform.eulerAngles.y - default_rotation ) < MAX_EULER_Y){
			this.transform.parent.transform.Rotate(0.0f, OPEN_SPEED, 0.0f);
		}else{
			cur_state == STATE["OPEN"];
		}
	}else if(cur_state == STATE["CLOSING"]){
		if( Mathf.Abs (this.transform.parent.transform.eulerAngles.y - default_rotation ) < MAX_EULER_Y + 1.0f
		&& Mathf.Abs ( this.transform.parent.transform.eulerAngles.y - default_rotation ) > 1.0f ){
				this.transform.parent.transform.Rotate(0.0f, -OPEN_SPEED, 0.0f);
		}else{
			cur_state == STATE["CLOSE"];
		}
	}
}

public function ChangeState(){
	if(cur_state == STATE["OPEN"] || cur_state == STATE["OPENING"]){
		cur_state = STATE["CLOSING"];
	}else if (cur_state == STATE["CLOSE"] || cur_state == STATE["CLOSING"]){
		cur_state = STATE["OPENING"];
	}
}

function OnTriggerEnter(col : Collider){
	if(col.tag == "Player"){
		col.GetComponent.<ItemFinder>().Find(this.gameObject);
	}
}