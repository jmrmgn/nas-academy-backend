# REST API Parking Lot Manager

A simple API that manages a parking lot that is rate-limited by the IP Address.



## Config File (.env)

```
NODE_ENV=development
PORT=3000

// Parking Lot size
PARKING_LOT_SIZE=5

// Reset restriction
RESET_SECONDS=10

// Counter Limit
REQUEST_LIMIT=10

// Time frame of requests
REQUEST_TIME_FRAME=10
```



## Quick Start

```
// go to directory
cd backend
npm install
npm start
```

Your app should now be running on [localhost:3000](http://localhost:5000/).



## Endpoints

### [POST] Park a Car

It will be given the car number as input and outputs the slot where it is parked.

```
POST /api/park
```

#### **Samples**

**Body** raw (json)

```json
{
   "carNumber": "ABC-123",
   "slotNumber": 1,
}
```

**Response**

```json
Status: 201 Created

{
    "carNumber": "ABC-123",
    "slotNumber": 1,
    "timeParked": "2021-05-02T07:40:50.790Z"
}
```

#### **Validations**

**Required fields**

**Body** raw (json)

```json
{}
```

**Response**

```json
Status: 400 Bad Request

{
	"code": 400,
    "message": "Validation Error",
    "errors": {
        "carNumber": [
            "carNumber is required",
            "carNumber must be string"
        ],
        "slotNumber": [
            "slotNumber is required"
        ]
    },
    ...
}
```

**Parking lot is full**

**Response**

```json
Status: 400 Bad Request

{
	"code": 422,
    "message": "Parking Lot is full",
}
```

**If slot is already occupied**

**Response**

```json
Status: 422 Bad Request

{
	"code": 422,
    "message": "Slot number is already occupied",
}
```



### [DELETE] Unpark the Car

Takes the slot number from which the car is to be removed from and frees that slot up to be used by other cars.

```
DELETE /api/unpark/:carNumber
```

**Samples**

**Path Variables**

| Key       | Value   | Description |
| --------- | ------- | ----------- |
| carNumber | ABC-123 | Car number  |

**Response**

```json
Status: 204 No Content
```

**Validations**

**When park is not parked**

```json
Status: 404 Bad Request

{
	"code": 404,
    "message": "Car not found",
}
```



### [GET] Get the Car/Slot Information

Take either the slot or car number and return both information.

```
GET /api/park/:number/:type
```

**Path Variables**

| Key    | Value                         | Description                                   |
| ------ | ----------------------------- | --------------------------------------------- |
| number | `1` or `ABC-123`              | Car number or Slot Number                     |
| type   | `car-number` or `slot-number` | Type of input number. Default is `car-number` |

**Response**

```json
Status: 200 No Content

{
    "carNumber": "ABC-123",
    "slotNumber": 1,
    "timeParked": "2021-05-02T07:40:50.790Z"
}
```

**Validations**

**When car or slot number not found**

```json
Status: 404 Bad Request

{
	"code": 404,
    "message": "Not found",
}
```