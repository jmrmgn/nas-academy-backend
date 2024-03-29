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

Takes the car and slot number as input to park a car.

```
POST /api/park
```

#### **Samples**

**Body** raw (json)

```json
{
  "carNumber": "ABC-123",
  "slotNumber": "SLOT-1"
}
```

**Response**

```json
Status: 201 Created

{
    "carNumber": "ABC-123",
    "slotNumber": "SLOT-1",
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
            "slotNumber is required",
            "slotNumber  must be string"
        ]
    },
}
```

**Parking lot is full**

**Response**

```json
Status: 422 Unprocessable Entity

{
	"code": 422,
    "message": "Parking Lot is full",
}
```

**If the slot is already occupied**

**Response**

```json
Status: 422 Unprocessable Entity

{
	"code": 422,
    "message": "Slot number is already occupied",
}
```





### [DELETE] Unpark the Car

Takes the slot number from which car is to be removed  and frees that slot to be used by the incoming cars.

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

**When a car is not parked**

```json
Status: 404 Not Found

{
	"code": 404,
    "message": "Car not found",
}
```





### [GET] Get the Car/Slot Information

Takes either the slot or car number and return both information.

```
GET /api/park/:number/:type
```

**Path Variables**

| Key    | Value                         | Description                                   |
| ------ | ----------------------------- | --------------------------------------------- |
| number | `SLOT-1` or `ABC-123`         | Car number or Slot Number                     |
| type   | `car-number` or `slot-number` | Type of input number. Default is `car-number` |

**Response**

```json
Status: 200 OK

{
    "carNumber": "ABC-123",
    "slotNumber": "SLOT-1",
    "timeParked": "2021-05-02T07:40:50.790Z"
}
```

**Validations**

**When car or slot number is not found**

```json
Status: 404 Not Found

{
	"code": 404,
    "message": "Car/Slot number is not found",
}
```





### [GET] Get Available Parking slots

Return the total available parking slots.

```
GET /api/park
```

**Response**

```json
Status: 200 OK

{
    "totalSlots": 10
}
```
