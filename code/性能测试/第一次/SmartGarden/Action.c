Action()
{

	web_set_sockets_option("SSL_VERSION", "2&3");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	web_url("localhost:3000", 
		"URL=http://localhost:3000/", 
		"Resource=0", 
		"Referer=", 
		"Snapshot=t38.inf", 
		"Mode=HTTP", 
		LAST);

	web_concurrent_start(NULL);

	web_url("main.js", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/", 
		"Snapshot=t39.inf", 
		LAST);

	web_url("download.mozilla.org", 
		"URL=http://download.mozilla.org/?product=firefox-56.0b3-complete&os=win64&lang=zh-CN", 
		"Resource=1", 
		"RecContentType=application/octet-stream", 
		"Referer=", 
		"Snapshot=t40.inf", 
		LAST);

	web_concurrent_end(NULL);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

/*Correlation comment - Do not change!  Original value='1111111111' Name ='phone' Type ='ResponseBased'*/
	web_reg_save_param_json(
		"ParamName=phone",
		"QueryString=$.phone",
		SEARCH_FILTERS,
		"Scope=Body",
		"IgnoreRedirections=No",
		LAST);

	web_url("loginWithEmail", 
		"URL=http://localhost:8080/users/loginWithEmail?email={userName}&password=123", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/", 
		"Snapshot=t41.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t42.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_2", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t43.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(4);

	web_url("getByUserId_3", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t44.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"URL=http://localhost:3000/assets/images/gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t45.inf", 
		LAST);

	web_url("getByGardenId", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=4", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t46.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getSensorByGardenId", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=4", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t47.inf", 
		"Mode=HTTP", 
		LAST);

	web_concurrent_start(NULL);

	web_url("humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png", 
		"URL=http://localhost:3000/assets/images/humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t48.inf", 
		LAST);

	web_url("monitorSensor.ba6ff3cbe4ccaf9ca24936b1f595c1a1.png", 
		"URL=http://localhost:3000/assets/images/monitorSensor.ba6ff3cbe4ccaf9ca24936b1f595c1a1.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t49.inf", 
		LAST);

	web_url("temperatureSensor.0643342a962291348f79c7a482d84180.png", 
		"URL=http://localhost:3000/assets/images/temperatureSensor.0643342a962291348f79c7a482d84180.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t50.inf", 
		LAST);

	web_concurrent_end(NULL);

	web_revert_auto_header("Origin");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	lr_think_time(7);

	web_url("user", 
		"URL=http://localhost:3000/user", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=", 
		"Snapshot=t51.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("main.js_2", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t52.inf", 
		LAST);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	web_url("getByUserId_4", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t53.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_5", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t54.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(12);

	web_submit_data("addGardenWithUserId", 
		"Action=http://localhost:8080/garden/addGardenWithUserId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t55.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=gardenName", "Value=haha", ENDITEM, 
		"Name=positionX", "Value=1", ENDITEM, 
		"Name=positionY", "Value=1", ENDITEM, 
		"Name=width", "Value=600", ENDITEM, 
		"Name=length", "Value=600", ENDITEM, 
		"Name=userId", "Value=1", ENDITEM, 
		LAST);

	web_url("getByUserId_6", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t56.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(6);

	web_submit_data("deleteByGardenId", 
		"Action=http://localhost:8080/garden/deleteByGardenId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t57.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=gardenId", "Value=16", ENDITEM, 
		LAST);

	web_url("getByUserId_7", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t58.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_8", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t59.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png_2", 
		"URL=http://localhost:3000/assets/images/gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t60.inf", 
		LAST);

	web_url("getSensorByGardenId_2", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t61.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByGardenId_2", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t62.inf", 
		"Mode=HTTP", 
		LAST);

	web_revert_auto_header("Origin");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	lr_think_time(10);

	web_url("user_2", 
		"URL=http://localhost:3000/user", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t63.inf", 
		"Mode=HTTP", 
		LAST);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	web_submit_data("addSensorWithGardenId", 
		"Action=http://localhost:8080/sensors/addSensorWithGardenId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t64.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=positionX", "Value=456", ENDITEM, 
		"Name=positionY", "Value=544", ENDITEM, 
		"Name=sensorType", "Value=1", ENDITEM, 
		"Name=gardenId", "Value=21", ENDITEM, 
		LAST);

	web_url("getSensorByGardenId_3", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t65.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("main.js_3", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t66.inf", 
		LAST);

	web_url("getByUserId_9", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t67.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_10", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t68.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_11", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t69.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png_3", 
		"URL=http://localhost:3000/assets/images/gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t70.inf", 
		LAST);

	web_url("getSensorByGardenId_4", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t71.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByGardenId_3", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t72.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png_2", 
		"URL=http://localhost:3000/assets/images/humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t73.inf", 
		LAST);

/* Added by Async CodeGen.
ID=Poll_0
ScanType = Recording

The following URLs are considered part of this conversation:
	http://localhost:8080/sensors/getSensorBySensorId?sensorId=22

TODO - The following callbacks have been added to AsyncCallbacks.c.
Add your code to the callback implementations as necessary.
	Poll_0_RequestCB
	Poll_0_ResponseCB
 */
	web_reg_async_attributes("ID=Poll_0", 
		"Pattern=Poll", 
		"URL=http://localhost:8080/sensors/getSensorBySensorId?sensorId=22", 
		"PollIntervalMs=800", 
		"RequestCB=Poll_0_RequestCB", 
		"ResponseCB=Poll_0_ResponseCB", 
		LAST);

	web_url("getSensorBySensorId", 
		"URL=http://localhost:8080/sensors/getSensorBySensorId?sensorId=22", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t74.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifySensorState", 
		"Action=http://localhost:8080/sensors/modifySensorState", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t75.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=sensorId", "Value=22", ENDITEM, 
		"Name=sensorState", "Value=1", ENDITEM, 
		LAST);

	web_url("getSensorByGardenId_5", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t76.inf", 
		"Mode=HTTP", 
		LAST);

/* Removed by Async CodeGen.
ID = Poll_0
 */
	/*
 web_url("getSensorBySensorId_2",
		"URL=http://localhost:8080/sensors/getSensorBySensorId?sensorId=22",
		"Resource=0",
		"RecContentType=application/json",
		"Referer=http://localhost:3000/user",
		"Snapshot=t77.inf",
		"Mode=HTTP",
		LAST); 
	*/

	web_submit_data("modifySensorState_2", 
		"Action=http://localhost:8080/sensors/modifySensorState", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t78.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=sensorId", "Value=22", ENDITEM, 
		"Name=sensorState", "Value=0", ENDITEM, 
		LAST);

	web_url("getSensorByGardenId_6", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t79.inf", 
		"Mode=HTTP", 
		LAST);

/* Removed by Async CodeGen.
ID = Poll_0
 */
	/*
 web_url("getSensorBySensorId_3",
		"URL=http://localhost:8080/sensors/getSensorBySensorId?sensorId=22",
		"Resource=0",
		"RecContentType=application/json",
		"Referer=http://localhost:3000/user",
		"Snapshot=t80.inf",
		"Mode=HTTP",
		LAST); 
	*/

	web_submit_data("modifySensorState_3", 
		"Action=http://localhost:8080/sensors/modifySensorState", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t81.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=sensorId", "Value=22", ENDITEM, 
		"Name=sensorState", "Value=1", ENDITEM, 
		LAST);

	web_url("getSensorByGardenId_7", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t82.inf", 
		"Mode=HTTP", 
		LAST);

/* Removed by Async CodeGen.
ID = Poll_0
 */
	/*
 web_url("getSensorBySensorId_4",
		"URL=http://localhost:8080/sensors/getSensorBySensorId?sensorId=22",
		"Resource=0",
		"RecContentType=application/json",
		"Referer=http://localhost:3000/user",
		"Snapshot=t83.inf",
		"Mode=HTTP",
		LAST); 
	*/

	web_submit_data("modifySensorState_4", 
		"Action=http://localhost:8080/sensors/modifySensorState", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t84.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=sensorId", "Value=22", ENDITEM, 
		"Name=sensorState", "Value=0", ENDITEM, 
		LAST);

	web_url("getSensorByGardenId_8", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t85.inf", 
		"Mode=HTTP", 
		LAST);

/* Removed by Async CodeGen.
ID = Poll_0
 */
	/*
 web_url("getSensorBySensorId_5",
		"URL=http://localhost:8080/sensors/getSensorBySensorId?sensorId=22",
		"Resource=0",
		"RecContentType=application/json",
		"Referer=http://localhost:3000/user",
		"Snapshot=t86.inf",
		"Mode=HTTP",
		LAST); 
	*/

/* Added by Async CodeGen.
ID = Poll_0
 */
	web_stop_async("ID=Poll_0", 
		LAST);

	web_submit_data("modifySensorState_5", 
		"Action=http://localhost:8080/sensors/modifySensorState", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t87.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=sensorId", "Value=22", ENDITEM, 
		"Name=sensorState", "Value=1", ENDITEM, 
		LAST);

	web_url("getSensorByGardenId_9", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t88.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(4);

	web_url("firefox-56.0b3.complete.mar", 
		"URL=http://download.cdn.mozilla.net/pub/firefox/releases/56.0b3/update/win64/zh-CN/firefox-56.0b3.complete.mar", 
		"Resource=1", 
		"RecContentType=application/octet-stream", 
		"Referer=", 
		"Snapshot=t89.inf", 
		LAST);

	web_submit_data("addSensorWithGardenId_2", 
		"Action=http://localhost:8080/sensors/addSensorWithGardenId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t90.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=positionX", "Value=74", ENDITEM, 
		"Name=positionY", "Value=82", ENDITEM, 
		"Name=sensorType", "Value=2", ENDITEM, 
		"Name=gardenId", "Value=21", ENDITEM, 
		LAST);

	web_revert_auto_header("Origin");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	web_url("user_3", 
		"URL=http://localhost:3000/user", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t91.inf", 
		"Mode=HTTP", 
		LAST);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	web_url("getSensorByGardenId_10", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t92.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("main.js_4", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t93.inf", 
		LAST);

	web_url("getByUserId_12", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t94.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_13", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t95.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_14", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t96.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png_4", 
		"URL=http://localhost:3000/assets/images/gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t97.inf", 
		LAST);

	web_url("getByGardenId_4", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t98.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getSensorByGardenId_11", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t99.inf", 
		"Mode=HTTP", 
		LAST);

	web_concurrent_start(NULL);

	web_url("humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png_3", 
		"URL=http://localhost:3000/assets/images/humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t100.inf", 
		LAST);

	web_url("temperatureSensor.0643342a962291348f79c7a482d84180.png_2", 
		"URL=http://localhost:3000/assets/images/temperatureSensor.0643342a962291348f79c7a482d84180.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t101.inf", 
		LAST);

	web_concurrent_end(NULL);

	web_url("getSensorBySensorId_6", 
		"URL=http://localhost:8080/sensors/getSensorBySensorId?sensorId=23", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t102.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifySensorState_6", 
		"Action=http://localhost:8080/sensors/modifySensorState", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t103.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=sensorId", "Value=23", ENDITEM, 
		"Name=sensorState", "Value=1", ENDITEM, 
		LAST);

	web_url("getSensorByGardenId_12", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t104.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(11);

	web_submit_data("addSensorWithGardenId_3", 
		"Action=http://localhost:8080/sensors/addSensorWithGardenId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t105.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=positionX", "Value=168", ENDITEM, 
		"Name=positionY", "Value=426", ENDITEM, 
		"Name=sensorType", "Value=3", ENDITEM, 
		"Name=gardenId", "Value=21", ENDITEM, 
		LAST);

	web_revert_auto_header("Origin");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	web_url("user_4", 
		"URL=http://localhost:3000/user", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t106.inf", 
		"Mode=HTTP", 
		LAST);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	web_url("getSensorByGardenId_13", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t107.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("main.js_5", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t108.inf", 
		LAST);

	web_url("getByUserId_15", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t109.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_16", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t110.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_17", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t111.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png_5", 
		"URL=http://localhost:3000/assets/images/gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t112.inf", 
		LAST);

	web_url("getByGardenId_5", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t113.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getSensorByGardenId_14", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t114.inf", 
		"Mode=HTTP", 
		LAST);

	web_concurrent_start(NULL);

	web_url("humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png_4", 
		"URL=http://localhost:3000/assets/images/humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t115.inf", 
		LAST);

	web_url("temperatureSensor.0643342a962291348f79c7a482d84180.png_3", 
		"URL=http://localhost:3000/assets/images/temperatureSensor.0643342a962291348f79c7a482d84180.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t116.inf", 
		LAST);

	web_url("monitorSensor.ba6ff3cbe4ccaf9ca24936b1f595c1a1.png_2", 
		"URL=http://localhost:3000/assets/images/monitorSensor.ba6ff3cbe4ccaf9ca24936b1f595c1a1.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t117.inf", 
		LAST);

	web_concurrent_end(NULL);

	web_url("getSensorBySensorId_7", 
		"URL=http://localhost:8080/sensors/getSensorBySensorId?sensorId=24", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t118.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifySensorState_7", 
		"Action=http://localhost:8080/sensors/modifySensorState", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t119.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=sensorId", "Value=24", ENDITEM, 
		"Name=sensorState", "Value=1", ENDITEM, 
		LAST);

	web_url("getSensorByGardenId_15", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t120.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_18", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t121.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByGardenId_6", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t122.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getNozzleByGardenId", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t123.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(14);

	web_submit_data("addNozzleByGardenId", 
		"Action=http://localhost:8080/nozzles/addNozzleByGardenId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t124.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=positionX", "Value=323", ENDITEM, 
		"Name=positionY", "Value=222", ENDITEM, 
		"Name=nozzleState", "Value=1", ENDITEM, 
		"Name=radius", "Value=10", ENDITEM, 
		"Name=gardenId", "Value=21", ENDITEM, 
		LAST);

	web_revert_auto_header("Origin");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	web_url("user_5", 
		"URL=http://localhost:3000/user", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t125.inf", 
		"Mode=HTTP", 
		LAST);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	web_url("getNozzleByGardenId_2", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t126.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("main.js_6", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t127.inf", 
		LAST);

	web_url("getByUserId_19", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t128.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_20", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t129.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_21", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t130.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png_6", 
		"URL=http://localhost:3000/assets/images/gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t131.inf", 
		LAST);

	web_url("getNozzleByGardenId_3", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t132.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByGardenId_7", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t133.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("nozzle.8c1cd0b3b1967df77de0eb204452cdc6.png", 
		"URL=http://localhost:3000/assets/images/nozzle.8c1cd0b3b1967df77de0eb204452cdc6.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t134.inf", 
		LAST);

	web_url("getNozzleByNozzleId", 
		"URL=http://localhost:8080/nozzles/getNozzleByNozzleId?nozzleId=25", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t135.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifyStateByNozzleId", 
		"Action=http://localhost:8080/nozzles/modifyStateByNozzleId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t136.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=nozzleId", "Value=25", ENDITEM, 
		"Name=state", "Value=0", ENDITEM, 
		LAST);

	web_url("getNozzleByGardenId_4", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t137.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getNozzleByNozzleId_2", 
		"URL=http://localhost:8080/nozzles/getNozzleByNozzleId?nozzleId=25", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t138.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifyStateByNozzleId_2", 
		"Action=http://localhost:8080/nozzles/modifyStateByNozzleId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t139.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=nozzleId", "Value=25", ENDITEM, 
		"Name=state", "Value=1", ENDITEM, 
		LAST);

	web_url("getNozzleByGardenId_5", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t140.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(10);

	web_url("firefox-56.0b3.complete.mar_2", 
		"URL=http://download.cdn.mozilla.net/pub/firefox/releases/56.0b3/update/win64/zh-CN/firefox-56.0b3.complete.mar", 
		"Resource=1", 
		"RecContentType=application/octet-stream", 
		"Referer=", 
		"Snapshot=t141.inf", 
		LAST);

	web_submit_data("addNozzleByGardenId_2", 
		"Action=http://localhost:8080/nozzles/addNozzleByGardenId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t142.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=positionX", "Value=145", ENDITEM, 
		"Name=positionY", "Value=432", ENDITEM, 
		"Name=nozzleState", "Value=1", ENDITEM, 
		"Name=radius", "Value=50", ENDITEM, 
		"Name=gardenId", "Value=21", ENDITEM, 
		LAST);

	web_revert_auto_header("Origin");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	web_url("user_6", 
		"URL=http://localhost:3000/user", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t143.inf", 
		"Mode=HTTP", 
		LAST);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	web_url("getNozzleByGardenId_6", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t144.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("main.js_7", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t145.inf", 
		LAST);

	web_url("getByUserId_22", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t146.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_23", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t147.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(64);

	web_url("firefox-56.0b3.complete.mar_3", 
		"URL=http://download.cdn.mozilla.net/pub/firefox/releases/56.0b3/update/win64/zh-CN/firefox-56.0b3.complete.mar", 
		"Resource=1", 
		"RecContentType=application/octet-stream", 
		"Referer=", 
		"Snapshot=t148.inf", 
		LAST);

	web_revert_auto_header("Origin");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	web_url("user_7", 
		"URL=http://localhost:3000/user", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t149.inf", 
		"Mode=HTTP", 
		LAST);

	web_concurrent_start(NULL);

	web_url("main.js_8", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t150.inf", 
		LAST);

	web_url("firefox-56.0b3.complete.mar_4", 
		"URL=http://download.cdn.mozilla.net/pub/firefox/releases/56.0b3/update/win64/zh-CN/firefox-56.0b3.complete.mar", 
		"Resource=1", 
		"RecContentType=application/octet-stream", 
		"Referer=", 
		"Snapshot=t151.inf", 
		LAST);

	web_concurrent_end(NULL);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	lr_think_time(129);

	web_url("getByUserId_24", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t152.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_25", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t153.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(24);

	web_url("getByUserId_26", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t154.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png_7", 
		"URL=http://localhost:3000/assets/images/gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t155.inf", 
		LAST);

	web_url("getSensorByGardenId_16", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t156.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByGardenId_8", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t157.inf", 
		"Mode=HTTP", 
		LAST);

	web_concurrent_start(NULL);

	web_url("humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png_5", 
		"URL=http://localhost:3000/assets/images/humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t158.inf", 
		LAST);

	web_url("temperatureSensor.0643342a962291348f79c7a482d84180.png_4", 
		"URL=http://localhost:3000/assets/images/temperatureSensor.0643342a962291348f79c7a482d84180.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t159.inf", 
		LAST);

	web_url("monitorSensor.ba6ff3cbe4ccaf9ca24936b1f595c1a1.png_3", 
		"URL=http://localhost:3000/assets/images/monitorSensor.ba6ff3cbe4ccaf9ca24936b1f595c1a1.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t160.inf", 
		LAST);

	web_concurrent_end(NULL);

	web_url("getByUserId_27", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t161.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getNozzleByGardenId_7", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t162.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByGardenId_9", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t163.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("nozzle.8c1cd0b3b1967df77de0eb204452cdc6.png_2", 
		"URL=http://localhost:3000/assets/images/nozzle.8c1cd0b3b1967df77de0eb204452cdc6.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t164.inf", 
		LAST);

	web_url("getByUserId_28", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t165.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_29", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t166.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_30", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t167.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getSensorByGardenId_17", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t168.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByGardenId_10", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=21", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t169.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(4);

	web_submit_data("updateUser",
		"Action=http://localhost:8080/users/updateUser",
		"Method=POST",
		"EncodeAtSign=YES",
		"RecContentType=application/json",
		"Referer=http://localhost:3000/user",
		"Snapshot=t170.inf",
		"Mode=HTTP",
		ITEMDATA,
		"Name=userId", "Value=1", ENDITEM,
		"Name=username", "Value=ch", ENDITEM,
		"Name=password", "Value=123", ENDITEM,
		"Name=phone", "Value={phone}", ENDITEM,
		"Name=email", "Value={userName}", ENDITEM,
		"Name=userType", "Value=0", ENDITEM,
		LAST);

	return 0;
}