Action()
{

	web_set_sockets_option("SSL_VERSION", "2&3");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	web_url("localhost:3000", 
		"URL=http://localhost:3000/", 
		"Resource=0", 
		"Referer=", 
		"Snapshot=t1.inf", 
		"Mode=HTTP", 
		LAST);

	web_concurrent_start(NULL);

	web_url("main.js", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"RecContentType=application/javascript", 
		"Referer=http://localhost:3000/", 
		"Snapshot=t2.inf", 
		LAST);

	web_url("download.mozilla.org", 
		"URL=http://download.mozilla.org/?product=firefox-56.0b3-complete&os=win64&lang=zh-CN", 
		"Resource=1", 
		"RecContentType=application/octet-stream", 
		"Referer=", 
		"Snapshot=t3.inf", 
		LAST);

	web_concurrent_end(NULL);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	lr_think_time(22);

	web_url("loginWithEmail", 
		"URL=http://localhost:8080/users/loginWithEmail?email=ch@ch.com&password=123", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/", 
		"Snapshot=t4.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t5.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_2", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t6.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(17);

	web_submit_data("addGardenWithUserId", 
		"Action=http://localhost:8080/garden/addGardenWithUserId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t7.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=gardenName", "Value=1", ENDITEM, 
		"Name=positionX", "Value=1", ENDITEM, 
		"Name=positionY", "Value=1", ENDITEM, 
		"Name=width", "Value=1000", ENDITEM, 
		"Name=length", "Value=1000", ENDITEM, 
		"Name=userId", "Value=1", ENDITEM, 
		LAST);

	web_url("getByUserId_3", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t8.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_4", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t9.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"URL=http://localhost:3000/assets/images/gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t10.inf", 
		LAST);

	web_revert_auto_header("Origin");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	lr_think_time(9);

	web_url("user", 
		"URL=http://localhost:3000/user", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t11.inf", 
		"Mode=HTTP", 
		LAST);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	web_submit_data("addSensorWithGardenId", 
		"Action=http://localhost:8080/sensors/addSensorWithGardenId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t12.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=positionX", "Value=456", ENDITEM, 
		"Name=positionY", "Value=456", ENDITEM, 
		"Name=sensorType", "Value=1", ENDITEM, 
		"Name=gardenId", "Value=232", ENDITEM, 
		LAST);

	web_url("main.js_2", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t13.inf", 
		LAST);

	web_url("getByUserId_5", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t14.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_6", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t15.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_7", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t16.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png_2", 
		"URL=http://localhost:3000/assets/images/gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t17.inf", 
		LAST);

	lr_think_time(9);

	web_submit_data("addSensorWithGardenId_2", 
		"Action=http://localhost:8080/sensors/addSensorWithGardenId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t18.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=positionX", "Value=654", ENDITEM, 
		"Name=positionY", "Value=666", ENDITEM, 
		"Name=sensorType", "Value=2", ENDITEM, 
		"Name=gardenId", "Value=232", ENDITEM, 
		LAST);

	web_revert_auto_header("Origin");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	web_url("user_2", 
		"URL=http://localhost:3000/user", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t19.inf", 
		"Mode=HTTP", 
		LAST);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	web_url("getSensorByGardenId", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t20.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("main.js_3", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t21.inf", 
		LAST);

	web_url("getByUserId_8", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t22.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_9", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t23.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("firefox-56.0b3.complete.mar", 
		"URL=http://download.cdn.mozilla.net/pub/firefox/releases/56.0b3/update/win64/zh-CN/firefox-56.0b3.complete.mar", 
		"Resource=1", 
		"RecContentType=application/octet-stream", 
		"Referer=", 
		"Snapshot=t24.inf", 
		LAST);

	web_url("getByUserId_10", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t25.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png_3", 
		"URL=http://localhost:3000/assets/images/gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t26.inf", 
		LAST);

	web_url("getSensorByGardenId_2", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t27.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByGardenId", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t28.inf", 
		"Mode=HTTP", 
		LAST);

	web_concurrent_start(NULL);

	web_url("temperatureSensor.0643342a962291348f79c7a482d84180.png", 
		"URL=http://localhost:3000/assets/images/temperatureSensor.0643342a962291348f79c7a482d84180.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t29.inf", 
		LAST);

	web_url("humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png", 
		"URL=http://localhost:3000/assets/images/humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t30.inf", 
		LAST);

	web_concurrent_end(NULL);

	lr_think_time(8);

	web_submit_data("addSensorWithGardenId_3", 
		"Action=http://localhost:8080/sensors/addSensorWithGardenId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t31.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=positionX", "Value=585", ENDITEM, 
		"Name=positionY", "Value=423", ENDITEM, 
		"Name=sensorType", "Value=3", ENDITEM, 
		"Name=gardenId", "Value=232", ENDITEM, 
		LAST);

	web_revert_auto_header("Origin");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	web_url("user_3", 
		"URL=http://localhost:3000/user", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t32.inf", 
		"Mode=HTTP", 
		LAST);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	web_url("getSensorByGardenId_3", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t33.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("main.js_4", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t34.inf", 
		LAST);

	web_url("getByUserId_11", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t35.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_12", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t36.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_13", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t37.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png_4", 
		"URL=http://localhost:3000/assets/images/gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t38.inf", 
		LAST);

	web_url("getSensorByGardenId_4", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t39.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByGardenId_2", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t40.inf", 
		"Mode=HTTP", 
		LAST);

	web_concurrent_start(NULL);

	web_url("temperatureSensor.0643342a962291348f79c7a482d84180.png_2", 
		"URL=http://localhost:3000/assets/images/temperatureSensor.0643342a962291348f79c7a482d84180.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t41.inf", 
		LAST);

	web_url("humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png_2", 
		"URL=http://localhost:3000/assets/images/humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t42.inf", 
		LAST);

	web_url("monitorSensor.ba6ff3cbe4ccaf9ca24936b1f595c1a1.png", 
		"URL=http://localhost:3000/assets/images/monitorSensor.ba6ff3cbe4ccaf9ca24936b1f595c1a1.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t43.inf", 
		LAST);

	web_concurrent_end(NULL);

	web_url("getSensorBySensorId", 
		"URL=http://localhost:8080/sensors/getSensorBySensorId?sensorId=235", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t44.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getSensorBySensorId_2", 
		"URL=http://localhost:8080/sensors/getSensorBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t45.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getSensorBySensorId_3", 
		"URL=http://localhost:8080/sensors/getSensorBySensorId?sensorId=233", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t46.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifySensorState", 
		"Action=http://localhost:8080/sensors/modifySensorState", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t47.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=sensorId", "Value=234", ENDITEM, 
		"Name=sensorState", "Value=1", ENDITEM, 
		LAST);

	web_submit_data("modifySensorState_2", 
		"Action=http://localhost:8080/sensors/modifySensorState", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t48.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=sensorId", "Value=235", ENDITEM, 
		"Name=sensorState", "Value=1", ENDITEM, 
		LAST);

	web_submit_data("modifySensorState_3", 
		"Action=http://localhost:8080/sensors/modifySensorState", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t49.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=sensorId", "Value=233", ENDITEM, 
		"Name=sensorState", "Value=1", ENDITEM, 
		LAST);

	web_url("getSensorByGardenId_5", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t50.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getSensorByGardenId_6", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t51.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getSensorByGardenId_7", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t52.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getSensorBySensorId_4", 
		"URL=http://localhost:8080/sensors/getSensorBySensorId?sensorId=235", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t53.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifySensorState_4", 
		"Action=http://localhost:8080/sensors/modifySensorState", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t54.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=sensorId", "Value=235", ENDITEM, 
		"Name=sensorState", "Value=0", ENDITEM, 
		LAST);

	web_url("getSensorByGardenId_8", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t55.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getSensorBySensorId_5", 
		"URL=http://localhost:8080/sensors/getSensorBySensorId?sensorId=235", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t56.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifySensorState_5", 
		"Action=http://localhost:8080/sensors/modifySensorState", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t57.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=sensorId", "Value=235", ENDITEM, 
		"Name=sensorState", "Value=1", ENDITEM, 
		LAST);

	web_url("getSensorByGardenId_9", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t58.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_14", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t59.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(6);

	web_custom_request("runAutoWatering", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t60.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t61.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_2", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t62.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_2", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t63.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("addNozzleByGardenId", 
		"Action=http://localhost:8080/nozzles/addNozzleByGardenId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t64.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=positionX", "Value=485", ENDITEM, 
		"Name=positionY", "Value=95", ENDITEM, 
		"Name=nozzleState", "Value=0", ENDITEM, 
		"Name=radius", "Value=30", ENDITEM, 
		"Name=gardenId", "Value=232", ENDITEM, 
		LAST);

	web_revert_auto_header("Origin");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	web_url("user_4", 
		"URL=http://localhost:3000/user", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t65.inf", 
		"Mode=HTTP", 
		LAST);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	web_url("getNozzleByGardenId_3", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t66.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("main.js_5", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t67.inf", 
		LAST);

	web_url("getByUserId_15", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t68.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_16", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t69.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_17", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t70.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png_5", 
		"URL=http://localhost:3000/assets/images/gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t71.inf", 
		LAST);

	lr_think_time(4);

	web_custom_request("runAutoWatering_3", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t72.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_4", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t73.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(4);

	web_custom_request("runAutoWatering_4", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t74.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_5", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t75.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("addNozzleByGardenId_2", 
		"Action=http://localhost:8080/nozzles/addNozzleByGardenId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t76.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=positionX", "Value=125", ENDITEM, 
		"Name=positionY", "Value=452", ENDITEM, 
		"Name=nozzleState", "Value=0", ENDITEM, 
		"Name=radius", "Value=50", ENDITEM, 
		"Name=gardenId", "Value=232", ENDITEM, 
		LAST);

	web_revert_auto_header("Origin");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	web_url("user_5", 
		"URL=http://localhost:3000/user", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t77.inf", 
		"Mode=HTTP", 
		LAST);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	web_url("getNozzleByGardenId_6", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t78.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("main.js_6", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t79.inf", 
		LAST);

	lr_think_time(6);

	web_url("getByUserId_18", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t80.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_19", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t81.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_20", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t82.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png_6", 
		"URL=http://localhost:3000/assets/images/gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t83.inf", 
		LAST);

	web_url("getNozzleByGardenId_7", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t84.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByGardenId_3", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t85.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("nozzle.8c1cd0b3b1967df77de0eb204452cdc6.png", 
		"URL=http://localhost:3000/assets/images/nozzle.8c1cd0b3b1967df77de0eb204452cdc6.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t86.inf", 
		LAST);

	web_custom_request("runAutoWatering_5", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t87.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_8", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t88.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(4);

	web_custom_request("runAutoWatering_6", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t89.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_9", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t90.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("firefox-56.0b3.complete.mar_2", 
		"URL=http://download.cdn.mozilla.net/pub/firefox/releases/56.0b3/update/win64/zh-CN/firefox-56.0b3.complete.mar", 
		"Resource=1", 
		"RecContentType=application/octet-stream", 
		"Referer=", 
		"Snapshot=t91.inf", 
		LAST);

	lr_think_time(4);

	web_custom_request("runAutoWatering_7", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t92.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_10", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t93.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("addNozzleByGardenId_3", 
		"Action=http://localhost:8080/nozzles/addNozzleByGardenId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t94.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=positionX", "Value=133", ENDITEM, 
		"Name=positionY", "Value=289", ENDITEM, 
		"Name=nozzleState", "Value=0", ENDITEM, 
		"Name=radius", "Value=80", ENDITEM, 
		"Name=gardenId", "Value=232", ENDITEM, 
		LAST);

	web_revert_auto_header("Origin");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	web_url("user_6", 
		"URL=http://localhost:3000/user", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t95.inf", 
		"Mode=HTTP", 
		LAST);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	web_url("getNozzleByGardenId_11", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t96.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("main.js_7", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t97.inf", 
		LAST);

	web_url("getByUserId_21", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t98.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_22", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t99.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_23", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t100.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png_7", 
		"URL=http://localhost:3000/assets/images/gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t101.inf", 
		LAST);

	lr_think_time(4);

	web_custom_request("runAutoWatering_8", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t102.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_12", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t103.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(5);

	web_custom_request("runAutoWatering_9", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t104.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_13", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t105.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(66);

	web_custom_request("runAutoWatering_10", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t106.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_custom_request("runAutoWatering_11", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t107.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_submit_data("addNozzleByGardenId_4", 
		"Action=http://localhost:8080/nozzles/addNozzleByGardenId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t108.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=positionX", "Value=789", ENDITEM, 
		"Name=positionY", "Value=652", ENDITEM, 
		"Name=nozzleState", "Value=0", ENDITEM, 
		"Name=radius", "Value=100", ENDITEM, 
		"Name=gardenId", "Value=232", ENDITEM, 
		LAST);

	web_custom_request("runAutoWatering_12", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t109.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_custom_request("runAutoWatering_13", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t110.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_submit_data("addNozzleByGardenId_5", 
		"Action=http://localhost:8080/nozzles/addNozzleByGardenId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t111.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=positionX", "Value=789", ENDITEM, 
		"Name=positionY", "Value=652", ENDITEM, 
		"Name=nozzleState", "Value=0", ENDITEM, 
		"Name=radius", "Value=100", ENDITEM, 
		"Name=gardenId", "Value=232", ENDITEM, 
		LAST);

	web_revert_auto_header("Origin");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	web_url("user_7", 
		"URL=http://localhost:3000/user", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t112.inf", 
		"Mode=HTTP", 
		LAST);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	web_custom_request("runAutoWatering_14", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t113.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_custom_request("runAutoWatering_15", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t114.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_custom_request("runAutoWatering_16", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t115.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_custom_request("runAutoWatering_17", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t116.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_custom_request("runAutoWatering_18", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t117.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_14", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t118.inf", 
		"Mode=HTTP", 
		LAST);

	web_concurrent_start(NULL);

	web_url("firefox-56.0b3.complete.mar_3", 
		"URL=http://download.cdn.mozilla.net/pub/firefox/releases/56.0b3/update/win64/zh-CN/firefox-56.0b3.complete.mar", 
		"Resource=1", 
		"RecContentType=application/octet-stream", 
		"Referer=", 
		"Snapshot=t119.inf", 
		LAST);

	web_url("main.js_8", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t120.inf", 
		LAST);

	web_concurrent_end(NULL);

	lr_think_time(63);

	web_custom_request("runAutoWatering_19", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t121.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getByGardenId_4", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t122.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_20", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t123.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_15", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t124.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_21", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t125.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_custom_request("runAutoWatering_22", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t126.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_16", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t127.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getNozzleByGardenId_17", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t128.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getNozzleByGardenId_18", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t129.inf", 
		"Mode=HTTP", 
		LAST);

	lr_think_time(63);

	web_url("firefox-56.0b3.complete.mar_4", 
		"URL=http://download.cdn.mozilla.net/pub/firefox/releases/56.0b3/update/win64/zh-CN/firefox-56.0b3.complete.mar", 
		"Resource=1", 
		"RecContentType=application/octet-stream", 
		"Referer=", 
		"Snapshot=t130.inf", 
		LAST);

	web_revert_auto_header("Origin");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	lr_think_time(9);

	web_url("user_8", 
		"URL=http://localhost:3000/user", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t131.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("main.js_9", 
		"URL=http://localhost:3000/main.js", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t132.inf", 
		LAST);

	web_add_auto_header("Origin", 
		"http://localhost:3000");

	web_url("getByUserId_24", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t133.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_25", 
		"URL=http://localhost:8080/garden/getByUserId?userId=-1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t134.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_26", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t135.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png_8", 
		"URL=http://localhost:3000/assets/images/gardenIcon.ef74e10d61fabc1628e7074a7b09dc01.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t136.inf", 
		LAST);

	web_url("getSensorByGardenId_10", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t137.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByGardenId_5", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t138.inf", 
		"Mode=HTTP", 
		LAST);

	web_concurrent_start(NULL);

	web_url("monitorSensor.ba6ff3cbe4ccaf9ca24936b1f595c1a1.png_2", 
		"URL=http://localhost:3000/assets/images/monitorSensor.ba6ff3cbe4ccaf9ca24936b1f595c1a1.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t139.inf", 
		LAST);

	web_url("temperatureSensor.0643342a962291348f79c7a482d84180.png_3", 
		"URL=http://localhost:3000/assets/images/temperatureSensor.0643342a962291348f79c7a482d84180.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t140.inf", 
		LAST);

	web_url("humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png_3", 
		"URL=http://localhost:3000/assets/images/humiditySensor.8ad937d1adc22cfd57131fb25a9ee3c8.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t141.inf", 
		LAST);

	web_concurrent_end(NULL);

	web_url("getByUserId_27", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t142.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getNozzleByGardenId_19", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t143.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByGardenId_6", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t144.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("nozzle.8c1cd0b3b1967df77de0eb204452cdc6.png_2", 
		"URL=http://localhost:3000/assets/images/nozzle.8c1cd0b3b1967df77de0eb204452cdc6.png", 
		"Resource=1", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t145.inf", 
		LAST);

	web_custom_request("runAutoWatering_23", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t146.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_20", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t147.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_28", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t148.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t149.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_2", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t150.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t151.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_24", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t152.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_21", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t153.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_2", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t154.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_3", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t155.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_3", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t156.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_4", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t157.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_25", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t158.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_22", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t159.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_5", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t160.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_4", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t161.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_6", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t162.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_5", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t163.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_26", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t164.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_23", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t165.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getNozzleByNozzleId", 
		"URL=http://localhost:8080/nozzles/getNozzleByNozzleId?nozzleId=240", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t166.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifyStateByNozzleId", 
		"Action=http://localhost:8080/nozzles/modifyStateByNozzleId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t167.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=nozzleId", "Value=240", ENDITEM, 
		"Name=state", "Value=1", ENDITEM, 
		LAST);

	web_url("getLastTempDataByGardenId_7", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t168.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_6", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t169.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getNozzleByGardenId_24", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t170.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getNozzleByNozzleId_2", 
		"URL=http://localhost:8080/nozzles/getNozzleByNozzleId?nozzleId=239", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t171.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifyStateByNozzleId_2", 
		"Action=http://localhost:8080/nozzles/modifyStateByNozzleId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t172.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=nozzleId", "Value=239", ENDITEM, 
		"Name=state", "Value=1", ENDITEM, 
		LAST);

	web_url("getNozzleByGardenId_25", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t173.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getNozzleByNozzleId_3", 
		"URL=http://localhost:8080/nozzles/getNozzleByNozzleId?nozzleId=238", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t174.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifyStateByNozzleId_3", 
		"Action=http://localhost:8080/nozzles/modifyStateByNozzleId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t175.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=nozzleId", "Value=238", ENDITEM, 
		"Name=state", "Value=1", ENDITEM, 
		LAST);

	web_url("getNozzleByGardenId_26", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t176.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_8", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t177.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_7", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t178.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getNozzleByNozzleId_4", 
		"URL=http://localhost:8080/nozzles/getNozzleByNozzleId?nozzleId=237", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t179.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifyStateByNozzleId_4", 
		"Action=http://localhost:8080/nozzles/modifyStateByNozzleId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t180.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=nozzleId", "Value=237", ENDITEM, 
		"Name=state", "Value=1", ENDITEM, 
		LAST);

	web_url("getNozzleByGardenId_27", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t181.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_27", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t182.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_28", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t183.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getNozzleByNozzleId_5", 
		"URL=http://localhost:8080/nozzles/getNozzleByNozzleId?nozzleId=236", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t184.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifyStateByNozzleId_5", 
		"Action=http://localhost:8080/nozzles/modifyStateByNozzleId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t185.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=nozzleId", "Value=236", ENDITEM, 
		"Name=state", "Value=1", ENDITEM, 
		LAST);

	web_url("getNozzleByGardenId_29", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t186.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_9", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t187.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_8", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t188.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getConfigByGardenId", 
		"URL=http://localhost:8080/waterConfig/getConfigByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t189.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("addConfigByGardenId", 
		"Action=http://localhost:8080/waterConfig/addConfigByGardenId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t190.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=bestTempMin", "Value=30", ENDITEM, 
		"Name=bestTempMax", "Value=35", ENDITEM, 
		"Name=bestHumiMin", "Value=0.4", ENDITEM, 
		"Name=bestHumiMax", "Value=0.6", ENDITEM, 
		"Name=gardenId", "Value=232", ENDITEM, 
		LAST);

	web_custom_request("runAutoWatering_28", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t191.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_30", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t192.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_10", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t193.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_9", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t194.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_11", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t195.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_10", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t196.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_29", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t197.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_31", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t198.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_12", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t199.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_11", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t200.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_13", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t201.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_12", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t202.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_30", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t203.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_32", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t204.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_14", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t205.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_13", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t206.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_31", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t207.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_33", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t208.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_15", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t209.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_14", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t210.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_16", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t211.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_15", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t212.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getNozzleByNozzleId_6", 
		"URL=http://localhost:8080/nozzles/getNozzleByNozzleId?nozzleId=240", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t213.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifyStateByNozzleId_6", 
		"Action=http://localhost:8080/nozzles/modifyStateByNozzleId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t214.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=nozzleId", "Value=240", ENDITEM, 
		"Name=state", "Value=1", ENDITEM, 
		LAST);

	web_url("getNozzleByGardenId_34", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t215.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_32", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t216.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_35", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t217.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getNozzleByNozzleId_7", 
		"URL=http://localhost:8080/nozzles/getNozzleByNozzleId?nozzleId=239", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t218.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifyStateByNozzleId_7", 
		"Action=http://localhost:8080/nozzles/modifyStateByNozzleId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t219.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=nozzleId", "Value=239", ENDITEM, 
		"Name=state", "Value=1", ENDITEM, 
		LAST);

	web_url("getNozzleByGardenId_36", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t220.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("firefox-56.0b3.complete.mar_5", 
		"URL=http://download.cdn.mozilla.net/pub/firefox/releases/56.0b3/update/win64/zh-CN/firefox-56.0b3.complete.mar", 
		"Resource=1", 
		"RecContentType=application/octet-stream", 
		"Referer=", 
		"Snapshot=t221.inf", 
		LAST);

	web_url("getNozzleByNozzleId_8", 
		"URL=http://localhost:8080/nozzles/getNozzleByNozzleId?nozzleId=238", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t222.inf", 
		"Mode=HTTP", 
		LAST);

	web_submit_data("modifyStateByNozzleId_8", 
		"Action=http://localhost:8080/nozzles/modifyStateByNozzleId", 
		"Method=POST", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t223.inf", 
		"Mode=HTTP", 
		ITEMDATA, 
		"Name=nozzleId", "Value=238", ENDITEM, 
		"Name=state", "Value=1", ENDITEM, 
		LAST);

	web_url("getNozzleByGardenId_37", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t224.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_17", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t225.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_16", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t226.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_18", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t227.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_17", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t228.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_33", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t229.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_38", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t230.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_19", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t231.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_18", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t232.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_34", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t233.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_39", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t234.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_20", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t235.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_19", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t236.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_21", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t237.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_20", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t238.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_35", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t239.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_40", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t240.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_22", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t241.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_21", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t242.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByUserId_29", 
		"URL=http://localhost:8080/garden/getByUserId?userId=1", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t243.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getSensorByGardenId_11", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t244.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByGardenId_7", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t245.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_23", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t246.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_22", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t247.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_36", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t248.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_41", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t249.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_24", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t250.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_23", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t251.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_37", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t252.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_42", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t253.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_25", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t254.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_24", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t255.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_26", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t256.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_25", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t257.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_38", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t258.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_43", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t259.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_27", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t260.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_26", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t261.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_28", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t262.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_27", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t263.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithSensorId", 
		"URL=http://localhost:8080/fakeData/generateDataWithSensorId?sensorId=235", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t264.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_39", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t265.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_44", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t266.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_29", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t267.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_28", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t268.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_40", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t269.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_45", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t270.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_30", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t271.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_29", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t272.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_31", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t273.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_30", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t274.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getSensorByGardenId_12", 
		"URL=http://localhost:8080/sensors/getSensorByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t275.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getByGardenId_8", 
		"URL=http://localhost:8080/garden/getByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t276.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_41", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t277.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_46", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t278.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_32", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t279.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_31", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t280.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t281.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_2", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t282.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_3", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t283.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_33", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t284.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_32", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t285.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_42", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t286.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_47", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t287.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_4", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t288.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_5", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t289.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_6", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t290.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_34", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t291.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_33", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t292.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_7", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t293.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_8", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t294.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_43", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t295.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_48", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t296.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_9", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t297.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_35", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t298.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_34", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t299.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithSensorId_2", 
		"URL=http://localhost:8080/fakeData/generateDataWithSensorId?sensorId=234", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t300.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_10", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t301.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_11", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t302.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_12", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t303.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_36", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t304.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_35", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t305.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_13", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t306.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_44", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t307.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_49", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t308.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_14", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t309.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_15", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t310.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_37", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t311.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_36", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t312.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_16", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t313.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_17", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t314.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("firefox-56.0b3.complete.mar_6", 
		"URL=http://download.cdn.mozilla.net/pub/firefox/releases/56.0b3/update/win64/zh-CN/firefox-56.0b3.complete.mar", 
		"Resource=1", 
		"RecContentType=application/octet-stream", 
		"Referer=", 
		"Snapshot=t315.inf", 
		LAST);

	web_url("getLast15TempDataBySensorId_18", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t316.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_38", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t317.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_37", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t318.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_45", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t319.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_50", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t320.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_19", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t321.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15TempDataBySensorId_20", 
		"URL=http://localhost:8080/temperature/getLast15TempDataBySensorId?sensorId=234", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t322.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15HumiDataBySensorId", 
		"URL=http://localhost:8080/humidity/getLast15HumiDataBySensorId?sensorId=233", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t323.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15HumiDataBySensorId_2", 
		"URL=http://localhost:8080/humidity/getLast15HumiDataBySensorId?sensorId=233", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t324.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_39", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t325.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_38", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t326.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15HumiDataBySensorId_3", 
		"URL=http://localhost:8080/humidity/getLast15HumiDataBySensorId?sensorId=233", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t327.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15HumiDataBySensorId_4", 
		"URL=http://localhost:8080/humidity/getLast15HumiDataBySensorId?sensorId=233", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t328.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15HumiDataBySensorId_5", 
		"URL=http://localhost:8080/humidity/getLast15HumiDataBySensorId?sensorId=233", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t329.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_46", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t330.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getLastTempDataByGardenId_40", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t331.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_39", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t332.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15HumiDataBySensorId_6", 
		"URL=http://localhost:8080/humidity/getLast15HumiDataBySensorId?sensorId=233", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t333.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getNozzleByGardenId_51", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t334.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15HumiDataBySensorId_7", 
		"URL=http://localhost:8080/humidity/getLast15HumiDataBySensorId?sensorId=233", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t335.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithSensorId_3", 
		"URL=http://localhost:8080/fakeData/generateDataWithSensorId?sensorId=233", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t336.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15HumiDataBySensorId_8", 
		"URL=http://localhost:8080/humidity/getLast15HumiDataBySensorId?sensorId=233", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t337.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_41", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t338.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_40", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t339.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15HumiDataBySensorId_9", 
		"URL=http://localhost:8080/humidity/getLast15HumiDataBySensorId?sensorId=233", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t340.inf", 
		"Mode=HTTP", 
		LAST);

	web_custom_request("runAutoWatering_47", 
		"URL=http://localhost:8080/waterConfig/runAutoWatering", 
		"Method=POST", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t341.inf", 
		"Mode=HTTP", 
		"EncType=", 
		LAST);

	web_url("getNozzleByGardenId_52", 
		"URL=http://localhost:8080/nozzles/getNozzleByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t342.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15HumiDataBySensorId_10", 
		"URL=http://localhost:8080/humidity/getLast15HumiDataBySensorId?sensorId=233", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t343.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15HumiDataBySensorId_11", 
		"URL=http://localhost:8080/humidity/getLast15HumiDataBySensorId?sensorId=233", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t344.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLastTempDataByGardenId_42", 
		"URL=http://localhost:8080/temperature/getLastTempDataByGardenId?gardenId=232", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t345.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("generateDataWithGardenId_41", 
		"URL=http://localhost:8080/fakeData/generateDataWithGardenId?gardenId=232", 
		"Resource=0", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t346.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15HumiDataBySensorId_12", 
		"URL=http://localhost:8080/humidity/getLast15HumiDataBySensorId?sensorId=233", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t347.inf", 
		"Mode=HTTP", 
		LAST);

	web_url("getLast15HumiDataBySensorId_13", 
		"URL=http://localhost:8080/humidity/getLast15HumiDataBySensorId?sensorId=233", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:3000/user", 
		"Snapshot=t348.inf", 
		"Mode=HTTP", 
		LAST);

	return 0;
}