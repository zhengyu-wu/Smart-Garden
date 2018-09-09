//Automatically generated file for implementing asynchronous callback functions.
//You can modify the automatically generated callback implementations or add new ones.
//Asynchronous callback functions can be registered using web_reg_async_attributes steps.
int Poll_0_RequestCB()
{
	//Enter your implementation for RequestCB() here.

	//Call web_util_set_request_url() here to modify polling URL.
	//URL is expected to be of the form:
	//http://localhost:8080/sensors/getSensorBySensorId?sensorId={Unknown_Poll_0_0}

	//The following parameter must be assigned:

	//TODO - Implement parameter of unknown type: Unknown_Poll_0_0.
	//Known examples for Unknown_Poll_0_0: sensorId=22, sensorId=22, sensorId=22, sensorId=22, sensorId=22, sensorId=23, sensorId=24, 
	lr_save_string("22","Unknown_Poll_0_0");

	//Once all parameters have been assigned, copy them to the updated URL.
	//Then call web_util_set_request_url() with the updated URL:
	web_util_set_request_url("http://localhost:8080/sensors/getSensorBySensorId?sensorId={Unknown_Poll_0_0}");

	//Call web_util_set_request_body() here to modify request body:
	//web_util_set_request_body("<request body>");

	return WEB_ASYNC_CB_RC_OK;
}

int Poll_0_ResponseCB(
	const char *	aResponseHeadersStr,
	int				aResponseHeadersLen,
	const char *	aResponseBodyStr,
	int				aResponseBodyLen,
	int				aHttpStatusCode)
{
	//Enter your implementation for ResponseCB() here.

	//TODO - To make the script wait for a specific response, use web_sync in the relevant Action file.
	//See the Modifying Callbacks section in the VuGen user guide for more details.

	return WEB_ASYNC_CB_RC_OK;
}

