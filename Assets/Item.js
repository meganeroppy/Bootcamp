#pragma strict

function Start () {

}

function Update () {


}

public function PickedUp(){
	Destroy(this.gameObject);
}

function OnTriggerEnter(col : Collider){
	if(col.tag == "Player"){
		col.GetComponent.<ItemFinder>().Find(this.gameObject);
	}
}