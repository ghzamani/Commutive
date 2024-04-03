# SPRINT1

# Things to insall
(assume you have python on your system)
pip install django
pip install djangorestframework
pip install django-allauth
pip install django-rest-auth
pip install django-cors-headers

# How to run the project
after installing the requirements, go to the commutive folder and use a command prompt:
	python manage.py runsever
then go to the url http://127.0.0.1:8000/

# How to test
POST	url: http://127.0.0.1:8000/rest-auth/registration/

	body:{
    "username": "myusername",
    "password1":"mypassword",
    "password2":"mypassword",
    "email":"myemail@gmail.com"
}

	status: 400 Bad Request

	response body:{
    "password1": [
        "This password is too common."
    ]
}

**********************************************************
POST	url: http://127.0.0.1:8000/rest-auth/registration/

	body:
{
    "username": "myusername",
    "password1":"thisismypassword",
    "password2":"thisismypassword",
    "email":"myemail@gmail.com"
}

	status: 201 Created

	response body:
{
    "detail": "Verification e-mail sent."
}

**********************************************************
POST	url: http://127.0.0.1:8000/rest-auth/registration/

	body:
{
    "username": "myusername",
    "password1":"wh@t@nicep@ssword",
    "password2":"wh@t@nicep@ssword",
    "email":"something@gmail.com"
}

	status: 400 Bad Request

	response body:
{
    "username": [
        "MyUser with this username already exists."
    ]
}

**********************************************************
POST	url: http://127.0.0.1:8000/rest-auth/registration/

	body:
{
    "username": "someusername",
    "password1":"Ilikethispassword!",
    "password2":"Ilikethispassword!",
    "email":"myemail@gmail.com"
}

	status: 400 Bad Request

	response body:
{
    "email": [
        "A user is already registered with this e-mail address."
    ]
}

**********************************************************
POST	url: http://127.0.0.1:8000/rest-auth/registration/

	body:
{
    "username": "myusername",
    "password1":"thisismypassword",
    "password2":"thisismypassword",
    "email":"myemail@gmail.com"
}

	status: 400 Bad Request

	response body:
{
    "username": [
        "MyUser with this username already exists."
    ],
    "email": [
        "A user is already registered with this e-mail address."
    ]
}

**********************************************************
POST	url: http://127.0.0.1:8000/rest-auth/registration/

	body:
{
    "username": "someusername",
    "password1":"Ilikethispassword!",
    "password2":"Ilikethispassword",
    "email":"myemail@yahoo.com"
}

	status: 400 Bad Request

	response body:
{
    "non_field_errors": [
        "The two password fields didn't match."
    ]
}

**********************************************************
POST	url: http://127.0.0.1:8000/rest-auth/registration/

	body:
{
    "username": "someusername",
    "password1":"good",
    "password2":"good",
    "email":"myemail@yahoo.com"
}

	status: 400 Bad Request

	response body:
{
    "password1": [
        "This password is too short. It must contain at least 8 characters.",
        "This password is too common."
    ]
}

**********************************************************
POST	url: http://127.0.0.1:8000/rest-auth/registration/

	body:
{
    "username": "someusername",
    "password1":"good",
    "password2":"good",
    "email":"myemail@yahoo.com"
}

	status: 400 Bad Request

	response body:
{
    "password1": [
        "This password is too short. It must contain at least 8 characters.",
        "This password is too common."
    ]
}

**********************************************************
POST	url: http://127.0.0.1:8000/rest-auth/registration/

	body:
{
    "username": "someusername",
    "password1":"good",
    "password2":"god",
    "email":"myemail@yahoo.com"
}
	status: 400 Bad Request

	response body:
{
    "password1": [
        "This password is too short. It must contain at least 8 characters.",
        "This password is too common."
    ]
}

**********************************************************
POST	url: http://127.0.0.1:8000/rest-auth/login/

(TRY it before confirming your email!)

	body:
{
    "username": "myusername",
    "password":"thisismypassword",
    "email":"myemail@gmail.com"
}
	status: 400 Bad Request

	response body:
{
    "non_field_errors": [
        "E-mail is not verified."
    ]
}

**********************************************************
POST	url: http://127.0.0.1:8000/rest-auth/login/

(TRY it after confirming your email!)

	body:
{
    "username": "myusername",
    "password":"thisismypassword",
    "email":"myemail@gmail.com"
}
	status: 200 OK

	response body:
{
    "key": "d897b7d6887cb9c2508b7924e8976ddc3b******"
}

(a 40-character key; including numbers and alphabets)

**********************************************************
POST	url: http://127.0.0.1:8000/rest-auth/logout/

	body:
{
    "username": "myusername",
    "password":"thisismypassword",
    "email":"myemail@gmail.com"
}
	status: 200 OK

	response body:
{
    "detail": "Successfully logged out."
}

**********************************************************
POST	url: http://127.0.0.1:8000/rest-auth/login/

(TRY it after confirming your email!)

	body:
{
    "username": "myusername",
    "password":"thisismypass",
    "email":"myemail@gmail.com"
}
	status: 400 Bad Request

	response body:
{
    "non_field_errors": [
        "Unable to log in with provided credentials."
    ]
}

**********************************************************
POST	url: http://127.0.0.1:8000/rest-auth/login/

	body:
{
    "username": "someuserisnice",
    "password":"thisismypassword",
    "email":"email@gmail.com"
}
	status: 400 Bad Request

	response body:
{
    "non_field_errors": [
        "Unable to log in with provided credentials."
    ]
}
********************************************************************************************************************
********************************************************************************************************************
# SPRINT2

# Things TO install
open command prompt, then:
     pip install Pillow 

# How to test
#MY EXPLAIN:

 guys I don't know if you test the first one or not but this community is not save for me so it should work but if it doesn't work for you guys, just try something new in CommunityID .
for testing you need user's Token . i mean if you want to test you need to be login (it needs Token) or it will retrun error .
the token i used: 4250c9d434ff4f5ac09ce987e417cb4af306a44a . this is for "amyrose" account
one more thing the url isn't change (lucky guys!)

last thing : field can not write as "field":"" because its has choices and never be empty string but i put it here just to be sure i write everything .
GOOD LUCK.
**********************************************************
POST    url: http://127.0.0.1:8000/create-community/
    I didn't give any token
        status = 401 Unauthorized
        body:{
        "name": "",
        "communityID" : "",
        "field": "",
        "description": "our team loves anime!"
}
        response body :{
        "detail": "Authentication credentials were not provided."
}

this one will return with any body that you use if you're not login.(even if you don't have a body!) 
**********************************************************
POST    url: http://127.0.0.1:8000/create-community/
    Headers: [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]
        body:
    {
    "name" :"LinkinPark",
    "communityID" :"LinkinPark_FansForEver" ,
    "field": "music",
    "description":"Long Live LinkinPark"
}


        status = 201 Created

        response body:{
    "name": "LinkinPark",
    "communityID": "LinkinPark_FansForEver",
    "field": "music",
    "description": "Long Live LinkinPark",
    "photo": null
}

**********************************************************
POST    url: http://127.0.0.1:8000/create-community/
        body:{
    "name" :"anime",
    "communityID" :"myAnime" ,
    "field": "anime"
}

        status = 201 Created

        response body:{
    "name": "anime",
    "communityID": "myAnime",
    "field": "anime",
    "description": "",
    "photo": null
}
**********************************************************
POST    url: http://127.0.0.1:8000/create-community/
        body:{
    "name": "ghazal",
    "communityID" : "sega2"
    "field": "art"
}

        status = 400 Bad Request

        response body:{
    "communityID": [
        "community with this communityID already exists."
    ]
}
**********************************************************
POST    url: http://127.0.0.1:8000/create-community/
        body:{
    "name": "ghazal",
    "communityID" : "myteam",
    "field": "football"
}

        status = 400 Bad Request

        response body:{
    "field": [
        "\"football\" is not a valid choice."
    ]
}
**********************************************************
POST    url: http://127.0.0.1:8000/create-community/
        body:{
    "name": "ghazal",
    "communityID" : "sega",
    "field": "football"
}

        status = 400 Bad Request

        response body:{
    "communityID": [
        "community with this communityID already exists."
    ],
    "field": [
        "\"football\" is not a valid choice."
    ]
}
**********************************************************
POST    url: http://127.0.0.1:8000/create-community/

        

        body:{
    "name": "sana",
    "communityID" : "this_is_our_community",
    "field": "anime",
    "description": "our team loves anime!"
}

        status = 201 Created

        response body:{
    "name": "sana",
    "communityID": "this_is_our_community",
    "field": "anime",
    "description": "our team loves anime!",
    "photo": null
}
**********************************************************
POST    url: http://127.0.0.1:8000/create-community/
        

        body:{
    "name": "",
    "communityID" : "this_is_our_community",
    "field": "anime",
    "description": "our team loves anime!"
}

        status = 400 Bad Request

        response body:{
    "name": [
        "This field may not be blank."
    ],
    "communityID": [
        "community with this communityID already exists."
    ]
}
**********************************************************
POST    url: http://127.0.0.1:8000/create-community/
        

        body:{
    "name": "",
    "communityID" : "this_is_nice_community",
    "field": "anime",
    "description": "our team loves anime!"
}

        status = 400 Bad Request

        response body:{
    "name": [
        "This field may not be blank."
    ]
}
**********************************************************
POST    url: http://127.0.0.1:8000/create-community/
        

        body:{
    "name": "saba",
    "communityID" : "",
    "description": "our team loves anime!"
}

        status = 400 Bad Request

        response body:{
    "communityID": [
        "This field may not be blank."
    ]
}

**********************************************************
POST    url: http://127.0.0.1:8000/create-community/
        

        body:{
    "name": "",
    "communityID" : "",
    "field": "anime",
    "description": "our team loves anime!"
}

        status = 400 Bad Request

        response body:{
    "name": [
        "This field may not be blank."
    ],
    "communityID": [
        "This field may not be blank."
    ]
}

**********************************************************
POST    url: http://127.0.0.1:8000/create-community/
        

        body:{
    "name": "",
    "communityID" : "",
    "field": "",
    "description": "our team loves anime!"
}

        status = 400 Bad Request

        response body:{
    "name": [
        "This field may not be blank."
    ],
    "communityID": [
        "This field may not be blank."
    ],
    "field": [
        "\"\" is not a valid choice."
    ]
}

**********************************************************
POST    url: http://127.0.0.1:8000/create-community/
        

        body:{
    "name": "we are the fallens",
    "communityID" : "rock songs",
    "field": "",
    "description": "our team loves Rocks!"
}

        status = 400 Bad Request

        response body:{
    "field": [
        "\"\" is not a valid choice."
    ]
}

**********************************************************
POST    url: http://127.0.0.1:8000/create-community/
        

        body:{
    "name": "",
    "communityID" : "rock songs",
    "field": "",
    "description": "our team loves Rocks!"
}

        status = 400 Bad Request

        response body:{
    "name": [
        "This field may not be blank."
    ],
    "field": [
        "\"\" is not a valid choice."
    ]
}
**********************************************************
POST    url: http://127.0.0.1:8000/create-community/
        

        body:{
    "name": "RoCK",
    "communityID" : "",
    "field": "",
    "description": "our team loves Rocks!"
}

        status = 400 Bad Request

        response body:{
    "communityID": [
        "This field may not be blank."
    ],
    "field": [
        "\"\" is not a valid choice."
    ]
}


**********************************************************
GET    url: http://127.0.0.1:8000/community/
        
        status = 200 OK

        response body:[
    {
        "name": "ghazal",
        "communityID": "ghazal_z_n",
        "field": "others",
        "description": "salamsalam",
        "photo": "http://127.0.0.1:8000/media/%DB%B2%DB%B0%DB%B1%DB%B8-%DB%B0%DB%B8-%DB%B0%DB%B8-%DB%B1%DB%B5.%DB%B4%DB%B3.%DB%B0%DB%B1.png"
    },
    {
        "name": "sonic",
        "communityID": "sega",
        "field": "others",
        "description": "",
        "photo": null
    },
    {
        "name": "sonic",
        "communityID": "sega2",
        "field": "art",
        "description": "",
        "photo": null
    },
    {
        "name": "sana",
        "communityID": "this_is_our_community",
        "field": "anime",
        "description": "our team loves anime!",
        "photo": null
    },
    {
        "name": "ali",
        "communityID": "ali@young",
        "field": "celebrities",
        "description": "ali loves anime and wants to share with you!",
        "photo": null
    },
    {
        "name": "linkinpark",
        "communityID": "linkinparkID",
        "field": "music",
        "description": "linkinpark rules",
        "photo": "http://127.0.0.1:8000/media/1401210370000-linkin-park.jpg"
    },
    {
        "name": "LinkinPark",
        "communityID": "LinkinPark_Fans",
        "field": "music",
        "description": "Long Live LinkinPark",
        "photo": null
    },
    {
        "name": "anime",
        "communityID": "myAnime",
        "field": "anime",
        "description": "",
        "photo": null
    }
]

**********************************************************
GET    url: http://127.0.0.1:8000/community/?q=so


        status = 200 OK

        response body:[
    {
        "name": "sonic",
        "communityID": "sega",
        "field": "others",
        "description": "",
        "photo": null
    },
    {
        "name": "sonic",
        "communityID": "sega2",
        "field": "art",
        "description": "",
        "photo": null
    }
]

**********************************************************
GET    url: http://127.0.0.1:8000/community/?q=


        status = 404 Not Found

        response body:{
    "detail": "Not found."
}

**********************************************************
GET    url: http://127.0.0.1:8000/community/?q=123


        status = 404 Not Found

        response body:{
    "detail": "Not found."
}

**********************************************************
GET    url: http://127.0.0.1:8000/community/?q=_z_n


        status = 200 OK

        response body:[
    {
        "name": "ghazal",
        "communityID": "ghazal_z_n",
        "field": "others",
        "description": "salamsalam",
        "photo": "http://127.0.0.1:8000/media/%DB%B2%DB%B0%DB%B1%DB%B8-%DB%B0%DB%B8-%DB%B0%DB%B8-%DB%B1%DB%B5.%DB%B4%DB%B3.%DB%B0%DB%B1.png"
    }
]

**********************************************************
GET    url: http://127.0.0.1:8000/community/?q=mu


        status = 200 OK

        response body:[
    {
        "name": "sana",
        "communityID": "this_is_our_community",
        "field": "anime",
        "description": "our team loves anime!",
        "photo": null
    },
    {
        "name": "linkinpark",
        "communityID": "linkinparkID",
        "field": "music",
        "description": "linkinpark rules",
        "photo": "http://127.0.0.1:8000/media/1401210370000-linkin-park.jpg"
    },
    {
        "name": "LinkinPark",
        "communityID": "LinkinPark_Fans",
        "field": "music",
        "description": "Long Live LinkinPark",
        "photo": null
    }
]

**********************************************************
GET    url: http://127.0.0.1:8000/community/?q=cooking


        status = 404 Not Found

        response body:{
    "detail": "Not found."
}
**********************************************************
GET    url: http://127.0.0.1:8000/community/?q=sega2


        status = 200 OK

        response body:[
    {
        "name": "sonic",
        "communityID": "sega2",
        "field": "art",
        "description": "",
        "photo": null
    }
]
**********************************************************
GET    url: http://127.0.0.1:8000/community/?q=sega


        status = 200 OK

        response body:[
    {
        "name": "sonic",
        "communityID": "sega",
        "field": "others",
        "description": "",
        "photo": null
    },
    {
        "name": "sonic",
        "communityID": "sega2",
        "field": "art",
        "description": "",
        "photo": null
    }
]

**********************************************************
GET    url: http://127.0.0.1:8000/community/?q=our


        status = 200 OK

        response body:[
    {
        "name": "sana",
        "communityID": "this_is_our_community",
        "field": "anime",
        "description": "our team loves anime!",
        "photo": null
    }
]

**********************************************************
GET    url: http://127.0.0.1:8000/community/?q=""


        status = 404 Not Found

        response body:{
    "detail": "Not found."
}

**********************************************************
GET    url: http://127.0.0.1:8000/community/?q=sonic


        status = 200 OK

        response body:[
    {
        "name": "sonic",
        "communityID": "sega",
        "field": "others",
        "description": "",
        "photo": null
    },
    {
        "name": "sonic",
        "communityID": "sega2",
        "field": "art",
        "description": "",
        "photo": null
    }
]

**********************************************************
GET    url: http://127.0.0.1:8000/community/?q=our team


        status = 200 OK

        response body:[
    {
        "name": "sana",
        "communityID": "this_is_our_community",
        "field": "anime",
        "description": "our team loves anime!",
        "photo": null
    }
]

**********************************************************
GET    url: http://127.0.0.1:8000/community/?q=notFound


        status = 404 Not Found

        response body:{
    "detail": "Not found."
}

**********************************************************
GET     url: http://127.0.0.1:8000/mycommunities/
        headers:{
            Authorization: Token a00456c6de0cd5ea426bd5c3c3f6206cce2e9160
        }

        status: 200 OK

        response body:{
            [
    {
        "name": "ghazal",
        "communityID": "ghazal_z_n",
        "field": "others",
        "description": "salamsalam",
        "photo": "http://127.0.0.1:8000/media/%DB%B2%DB%B0%DB%B1%DB%B8-%DB%B0%DB%B8-%DB%B0%DB%B8-%DB%B1%DB%B5.%DB%B4%DB%B3.%DB%B0%DB%B1.png"
    },
    {
        "name": "sonic",
        "communityID": "sega",
        "field": "others",
        "description": "",
        "photo": null
    },
    {
        "name": "ali",
        "communityID": "ali@young",
        "field": "celebrities",
        "description": "ali loves anime and wants to share with you!",
        "photo": null
    },
    {
        "name": "anime",
        "communityID": "myAnime",
        "field": "anime",
        "description": "",
        "photo": null
    }
]
        }

**********************************************************
GET     url: http://127.0.0.1:8000/mycommunities/
        Try this one without login

        status = 401 Unauthorized
        response body:{
            {
    "detail": "Authentication credentials were not provided."
}
        }
**********************************************************

GET     url: http://127.0.0.1:8000/mycommunities/
        headers:{
            Authorization: Token 74c9aefab031922b3ae83b38dd6b4e88a5ea0447
        }

        status: 200 OK

        response body:{
            []
        }
**********************************************************
this is for add member and permission
**********************************************************
PUT    url: http://127.0.0.1:8000/join-community/?q=sega
        
    Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a

        status = 400 Bad Request

        response body:{
    "You have already joined this community"
}
**********************************************************
PUT    url: http://127.0.0.1:8000/join-community/?q=sega2
        
    Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a

        status = 200 OK

        response body:{
    "name": "sonic",
    "communityID": "sega2",
    "field": "art",
    "description": "",
    "photo": null
}
**********************************************************
PUT    url: http://127.0.0.1:8000/join-community/?q=
        
    Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a

        status = 404 Not Found

        response body:"Community not found"

**********************************************************
PUT    url: http://127.0.0.1:8000/join-community/?q=parisa
        
    Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a

        status = 404 Not Found

        response body:"Community not found"

**********************************************************
PUT    url: http://127.0.0.1:8000/join-community/
        
    Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a

        status = 404 Not Found

        response body:"Community not found"

**********************************************************
PUT    url: http://127.0.0.1:8000/join-community/?q=sega
        
        NO Token

        status = 401 Unauthorized

        response body:{
    "detail": "Authentication credentials were not provided."
}

**********************************************************

Update

**********************************************************

**********************************************************
PUT    url: http://127.0.0.1:8000/communities/sega
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 200 OK
	body:{
    "name": "sonic_Sega",
    "description": "sonic Fan",
    "field":"game"
}
        response body:{
    "name": "sonic_Sega",
    "community_id": "sega",
    "field": "game",
    "description": "sonic Fan",
    "photo": "http://127.0.0.1:8000/media/crystal_catastophe__by_nibroc_rock-d8jcw2k_wdVv5ZX.png"
}


**********************************************************
**********************************************************
PUT    url: http://127.0.0.1:8000/communities/sega
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 200 OK
	body:{
    "name" : "My sonic",
    "description": "sonic Fan"

}
        response body:{{
    "name": "My sonic",
    "community_id": "sega",
    "field": "game",
    "description": "sonic Fan",
    "photo": "http://127.0.0.1:8000/media/crystal_catastophe__by_nibroc_rock-d8jcw2k_wdVv5ZX.png"
}

**********************************************************
PUT    url: http://127.0.0.1:8000/communities/sega
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 200 OK
	body:{
    "name" : "My sonic"

}
        response body:{
    "name": "My sonic",
    "community_id": "sega",
    "field": "game",
    "description": "sonic Fan",
    "photo": "http://127.0.0.1:8000/media/crystal_catastophe__by_nibroc_rock-d8jcw2k_wdVv5ZX.png"
}


**********************************************************
PUT    url: http://127.0.0.1:8000/update-community/segaFor/
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 404 Not Found
	body:{
    "name": "sonic_Sega",
    "description": "sonic Fan",
    "field":"game"
}
        response body:{
    "detail": "Not found."
}
**********************************************************
PUT    url: http://127.0.0.1:8000/communities/sega
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 400 Bad Request
	body:{
    "name": "",
    "description": "sonic Fan",
    "field":"game"
}
        response body:{
    "name": [
        "This field may not be blank."
    ]
}
**********************************************************
PUT    url: http://127.0.0.1:8000/communities/sega
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 400 Bad Request
	body:{
    "description": "sonic Fan",
    "field":"game"
}
        response body:{
    "name": [
        "This field is required."
    ]
}
**********************************************************
PUT    url: http://127.0.0.1:8000/communities/sega
        
  No Token

        status = 401 Unauthorized
	body:{
    "name":"sonic",
    "description": "sonic Fan",
    "field":"game"
}
        response body:{
    "detail": "Authentication credentials were not provided."
}

**********************************************************
PUT    url: http://127.0.0.1:8000/communities/sega
        
   Token ec3ac392aac9a921a1ddeda5b42f8a236e2d1645 -> not owner

        status = 403 Forbidden
	body:{
    "name":"sonic",
    "description": "sonic Fan",
    "field":"game"
}
        response body:{
    "detail": "You do not have permission to perform this action."
}

***********************************************************************************************************
***********************************************************************************************************
Show info of a specific community
***********************************************************************************************************
***********************************************************************************************************
All of urls are like this:
	http://127.0.0.1:8000/communities/communityID

GET http://127.0.0.1:8000/communities/sega

	This feature has "AllowAny" permission; everyone can see info of a specific community

	status: 200 OK
	response:
{
    "name": "parisa community",
    "communityID": "sega",
    "field": "game",
    "description": "my community is all about sonic",
    "photo": "/media/sonic.jpg",
    "owner_name": "amyrose",
    "members_name": [
        {
            "username": "amyrose"
        },
        {
            "username": "parpar"
        },
        {
            "username": "Shaghayegh"
        }
    ]
}


	code generated by postman:
var myHeaders = new Headers();
myHeaders.append("Cookie", "csrftoken=TVHyFRu15T8myjJ0lVl05aHgqke9H9eOHZY2StiSGxE7YIdSg5oUKiQwbr0MERJe");

var formdata = new FormData();

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8000/communities/seg", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

***********************************************************************************************************
Show info of a specific community
GET http://127.0.0.1:8000/communities/seg

	This feature has "AllowAny" permission; everyone can see info of a specific community

	status: 404 Not Found
	response body:
{
    "detail": "Not found."
}

**********************************************************************************************************************************************************************************************************************************************************************
# SPRINT3
**********************************************************************************************************************************************************************************************************************************************************************
***************************************
Creating post:
***************************************
All of urls are like this:
	http://127.0.0.1:8000/communities/communityID/posts

POST http://127.0.0.1:8000/communities/sega/posts

	Headers:
		Authorization: Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a
	body:
		form-data:
		caption: "i'm posting in last day of sprint ^_^"
		myFile : upload some file


	status = 201 Created
	response body:
{
    "caption": "\"i'm posting in last day of sprint ^_^\"",
    "myFile": "http://127.0.0.1:8000/media/posts/alanturing4-2x.jpg",
    "author": "amyrose",
    "time": "2020-12-03T09:43:23.022161Z",
    "id": 3
}
***************************************
show all posts:
***************************************
show all posts of oone community:

All of urls are like this:
	http://127.0.0.1:8000/communities/communityID/posts

POST http://127.0.0.1:8000/communities/sega/posts

	Headers:
		Authorization: Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a

GET http://127.0.0.1:8000/communities/sega/posts
    status = 200 OK
response body:[
    {
        "caption": "\"first post about sonic!\"",
        "myFile": null,
        "Author": "Shaghayegh",
        "Time": "2020-12-02 15:44:26.236919+00:00",
        "id": 1,
        "AllPeopleReported": [
            {
                "reports_count": 1,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    }
                ]
            }
        ],
        "AllPeopleLiked": [
            {
                "likes_count": 2,
                "Liked_By": [
                    {
                        "username": "ghazal"
                    },
                    {
                        "username": "Shaghayegh"
                    }
                ]
            }
        ]
    },
    {
        "caption": "\"I'm posting for dear saba!\"",
        "myFile": null,
        "Author": "Shaghayegh",
        "Time": "2020-12-02 15:44:26.236919+00:00",
        "id": 2,
        "AllPeopleReported": [],
        "AllPeopleLiked": []
    },
    {
        "caption": "\"I'm posting for dear saba!\"",
        "myFile": null,
        "Author": "Shaghayegh",
        "Time": "2020-12-02 15:44:26.236919+00:00",
        "id": 3,
        "AllPeopleReported": [],
        "AllPeopleLiked": []
    },
    {
        "caption": "\"I'm posting for dear saba!\"",
        "myFile": null,
        "Author": "Shaghayegh",
        "Time": "2020-12-02 15:44:26.236919+00:00",
        "id": 4,
        "AllPeopleReported": [],
        "AllPeopleLiked": []
    },
    {
        "caption": "\"I'm posting for dear saba!\"",
        "myFile": null,
        "Author": "Shaghayegh",
        "Time": "2020-12-02 15:44:26.236919+00:00",
        "id": 5,
        "AllPeopleReported": [
            {
                "reports_count": 1,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    }
                ]
            }
        ],
        "AllPeopleLiked": []
    },
    {
        "caption": "\"i love shadow\"",
        "myFile": null,
        "Author": "amyrose",
        "Time": "2020-12-02 15:45:36.834098+00:00",
        "id": 6,
        "AllPeopleReported": [
            {
                "reports_count": 1,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    }
                ]
            }
        ],
        "AllPeopleLiked": []
    },
    {
        "caption": "\"sonic universe\"",
        "myFile": null,
        "Author": "amyrose",
        "Time": "2020-12-02 17:31:52.942552+00:00",
        "id": 7,
        "AllPeopleReported": [
            {
                "reports_count": 1,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    }
                ]
            }
        ],
        "AllPeopleLiked": []
    },
    {
        "caption": "silver the hedgehog",
        "myFile": "/media/posts/25_1.jpg",
        "Author": "amyrose",
        "Time": "2020-12-07 12:57:13.326869+00:00",
        "id": 8,
        "AllPeopleReported": [
            {
                "reports_count": 1,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    }
                ]
            }
        ],
        "AllPeopleLiked": []
    },
    {
        "caption": "try update",
        "myFile": "/media/posts/25_2JtQZ1f.jpg",
        "Author": "amyrose",
        "Time": "2020-12-10 02:54:50.518727+00:00",
        "id": 9,
        "AllPeopleReported": [
            {
                "reports_count": 2,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    },
                    {
                        "username": "ghazal"
                    }
                ]
            }
        ],
        "AllPeopleLiked": [
            {
                "likes_count": 1,
                "Liked_By": [
                    {
                        "username": "amyrose"
                    }
                ]
            }
        ]
    },
    {
        "caption": "",
        "myFile": "/media/posts/25_Ulaofwp.jpg",
        "Author": "amyrose",
        "Time": "2020-12-11 20:35:55.863164+00:00",
        "id": 10,
        "AllPeopleReported": [
            {
                "reports_count": 1,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    }
                ]
            }
        ],
        "AllPeopleLiked": []
    },
    {
        "caption": "try delete for author",
        "myFile": "/media/posts/25_CCoGWCU.jpg",
        "Author": "amyrose",
        "Time": "2020-12-11 20:37:14.204792+00:00",
        "id": 12,
        "AllPeopleReported": [],
        "AllPeopleLiked": []
    },
    {
        "caption": "change communityId to foreinkey update",
        "myFile": "/media/posts/25_DFslQMA.jpg",
        "Author": "amyrose",
        "Time": "2020-12-11 21:50:03.243601+00:00",
        "id": 13,
        "AllPeopleReported": [],
        "AllPeopleLiked": []
    },
    {
        "caption": "i'm posting in last day of sprint ^_^",
        "myFile": null,
        "Author": "amyrose",
        "Time": "2020-12-11 23:08:30.547289+00:00",
        "id": 14,
        "AllPeopleReported": [],
        "AllPeopleLiked": []
    }
]

	code generated by postman:
var myHeaders = new Headers();
myHeaders.append("Authorization", "Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a");
myHeaders.append("Cookie", "csrftoken=TVHyFRu15T8myjJ0lVl05aHgqke9H9eOHZY2StiSGxE7YIdSg5oUKiQwbr0MERJe");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8000/communities/sega/posts", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

***********************************************************************************************************
Creating post:
POST http://127.0.0.1:8000/communities/sega/posts

	Headers:
		Authorization: Token 74e4e2bf20cfb166067f4d08de6c8587b266b42b
		user has not joined in the "sega"
	body:
		form-data:
		caption: "i'm posting in last day of sprint ^_^"
		myFile : upload some file

	status: 403 Forbidden
	response body:

{
    "detail": "You do not have permission to perform this action."
}

***********************************************************************************************************
Creating post:
POST http://127.0.0.1:8000/communities/sega/posts

	Try it without login
	body:
		form-data:
		caption: "i'm posting in last day of sprint ^_^"
		myFile : upload some file

	status: 401 Unauthorized
	response body:

{
    "detail": "Authentication credentials were not provided."
}

***********************************************************************************************************
Creating post:
POST http://127.0.0.1:8000/communities/seg/posts

	Headers:
		Authorization: Token 74e4e2bf20cfb166067f4d08de6c8587b266b42b
	body:
		form-data:
		caption: "i'm posting in last day of sprint ^_^"
		myFile : upload some file

	status: 404 Not Found
	response body:
		"Community Not found"


***********************************************************************************************************
Show info of a specific post(by its postID):
All of urls are like this:
	http://127.0.0.1:8000/communities/communityID/posts/id

GET http://127.0.0.1:8000/communities/sega/posts/1

	Headers:
		Authorization: Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a
		(user: "amyrose"  has joined in "sega")

	status: 200 OK
	response body:
{
    "caption": "\"first post about sonic!\"",
    "myFile": null,
    "Author": "Shaghayegh",
    "Time": "2020-12-02 15:44:26.236919+00:00",
    "id": 1,
    "AllPeopleReported": [
        {
            "reports_count": 1,
            "Reported_By": [
                {
                    "username": "amyrose"
                }
            ]
        }
    ],
    "AllPeopleLiked": [
        {
            "likes_count": 2,
            "Liked_By": [
                {
                    "username": "ghazal"
                },
                {
                    "username": "Shaghayegh"
                }
            ]
        }
    ]
}


	generated code by postman:
var myHeaders = new Headers();
myHeaders.append("Authorization", "Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a");
myHeaders.append("Cookie", "csrftoken=TVHyFRu15T8myjJ0lVl05aHgqke9H9eOHZY2StiSGxE7YIdSg5oUKiQwbr0MERJe");

var formdata = new FormData();

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8000/communities/sega/posts/1", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

***********************************************************************************************************
Show post:
GET http://127.0.0.1:8000/communities/sega/posts/1

	Headers:
		Authorization: Token 57a61a620f589e8327662ed6a443a71f8afe8348
		(user: "zeynnnn" has not joined in "sega")

	status: 403 Forbidden
	response body:
{
    "detail": "You do not have permission to perform this action."
}



***********************************************************************************************************
Show post:
GET http://127.0.0.1:8000/communities/sega/posts/1

	Try it without login

	status: 401 Unauthorized
	response body:
{
    "detail": "Authentication credentials were not provided."
} 

**********************************************************

report

**********************************************************

**********************************************************
all report main url looks like: communities/<pk>/posts/<int:id>/reports
***********************************************************
POST    http://127.0.0.1:8000/communities/sega/posts/1/reports
        
  [{"key":"Authorization","value":"Token 4f6a8f1242930491b188566b4a141bffe46da3c6","description":"","type":"text","enabled":true}]
        (join nabashe)
        status = 403 Forbidden

        response body:{
    "detail": "You do not have permission to perform this action."
}

**********************************************************
POST    http://127.0.0.1:8000/communities/sega/posts/1/reports
        
  [{"key":"Authorization","value":"Token ","description":"","type":"text","enabled":true}]
  (without login)

        status = 401 Unauthorized

        response body:{
    "detail": "Authentication credentials were not provided."
}

**********************************************************
POST    http://127.0.0.1:8000/communities/sega/posts/1/reports
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 200 OK

        response body:{
        "Reportpost": [
            {
                "caption": "\"first post about sonic!\"",
                "myFile": null,
                "author": "Shaghayegh",
                "time": "2020-12-02T15:44:26.236919Z",
                "id": 1
            }
        ],
        "reports_count": 1,
        "Reported_By": [
            {
                "username": "amyrose"
            }
        ]
    }


**********************************************************
GET    http://127.0.0.1:8000/communities/sega/posts/1/reports
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 200 OK

        response body:[
    {
        "Reportpost": [
            {
                "caption": "\"first post about sonic!\"",
                "myFile": null,
                "author": "Shaghayegh",
                "time": "2020-12-02T15:44:26.236919Z",
                "id": 1
            }
        ],
        "reports_count": 1,
        "Reported_By": [
            {
                "username": "amyrose"
            }
        ]
    }
]


**********************************************************

POST    url: http://127.0.0.1:8000/communities/sega/posts/1/reports
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 400 Bad Request

        response body:{"You have already reported this post"}



**********************************************************
***********************************************************************************************************
Reported posts of a specific community
All of the urls are like this:
	http://127.0.0.1:8000/communities/communityID/post/reports
Only the owner of the community has this permission

GET http://127.0.0.1:8000/communities/sega/post/reports
	Headers:
		Authorization: Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a
		(this user is owner of "sega")

	status: 200 OK
	response body:
[
    {
        "caption": "\"first post about sonic!\"",
        "myFile": null,
        "author": "Shaghayegh",
        "time": "2020-12-02T15:44:26.236919Z",
        "id": 1,
        "AllPeopleReports": [
            {
                "reports_count": 1,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    }
                ]
            }
        ]
    },
    {
        "caption": "\"I'm posting for dear saba!\"",
        "myFile": null,
        "author": "Shaghayegh",
        "time": "2020-12-02T15:44:26.236919Z",
        "id": 5,
        "AllPeopleReports": [
            {
                "reports_count": 1,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    }
                ]
            }
        ]
    },
    {
        "caption": "\"i love shadow\"",
        "myFile": null,
        "author": "amyrose",
        "time": "2020-12-02T15:45:36.834098Z",
        "id": 6,
        "AllPeopleReports": [
            {
                "reports_count": 1,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    }
                ]
            }
        ]
    },
    {
        "caption": "\"sonic universe\"",
        "myFile": null,
        "author": "amyrose",
        "time": "2020-12-02T17:31:52.942552Z",
        "id": 7,
        "AllPeopleReports": [
            {
                "reports_count": 1,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    }
                ]
            }
        ]
    },
    {
        "caption": "silver the hedgehog",
        "myFile": "/media/posts/25_1.jpg",
        "author": "amyrose",
        "time": "2020-12-07T12:57:13.326869Z",
        "id": 8,
        "AllPeopleReports": [
            {
                "reports_count": 1,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    }
                ]
            }
        ]
    },
    {
        "caption": "try update",
        "myFile": "/media/posts/25_2JtQZ1f.jpg",
        "author": "amyrose",
        "time": "2020-12-10T02:54:50.518727Z",
        "id": 9,
        "AllPeopleReports": [
            {
                "reports_count": 2,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    },
                    {
                        "username": "ghazal"
                    }
                ]
            }
        ]
    }
]

***********************************************************************************************************
Reported posts of a specific community


GET http://127.0.0.1:8000/communities/sega/post/reports
	Headers:
		Authorization: Token 9a686572931b43968975dbdfe8753b6987f955d3
		(this user has joined sega, but is not owner)

	status: 403 Forbidden
	response body:
{
    "detail": "You do not have permission to perform this action."
}

***********************************************************************************************************
Reported posts of a specific community


GET http://127.0.0.1:8000/communities/sega/post/reports
	Try it without login

	status: 401 Unauthorized
	response body:
{
    "detail": "Authentication credentials were not provided."
}
**********************************************************
CODE:
var myHeaders = new Headers();
myHeaders.append("Authorization", "Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a");

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8000/communities/sega/posts/1/reports", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
**********************************************************
**********************************************************
like post
**********************************************************
**********************************************************
All of the urls are like this for like:
	http://127.0.0.1:8000/communities/communityID/posts/<id>/likes
All of the urls are like this for unlike:
	http://127.0.0.1:8000/communities/communityID/posts/<id>/unlikes


POST,GET    http://127.0.0.1:8000/communities/sega/posts/1/likes
        
  [{"key":"Authorization","value":"Token 4f6a8f1242930491b188566b4a141bffe46da3c6","description":"","type":"text","enabled":true}]
        (join nabashe)
        status = 403 Forbidden

        response body:{
    "detail": "You do not have permission to perform this action."
}

**********************************************************
POST,GET    http://127.0.0.1:8000/communities/sega/posts/1/likes
        
  [{"key":"Authorization","value":"Token ","description":"","type":"text","enabled":true}]
  (without login)

        status = 401 Unauthorized

        response body:{
    "detail": "Authentication credentials were not provided."
}

**********************************************************
POST    http://127.0.0.1:8000/communities/sega/posts/1/likes
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]
(agar bar avali bashad ke like karde)
        status = 200 OK

        response body:{
    "likes_count": 3,
    "Liked_By": [
        {
            "username": "amyrose"
        },
        {
            "username": "ghazal"
        },
        {
            "username": "Shaghayegh"
        }
    ]
}
**********************************************************

POST    http://127.0.0.1:8000/communities/sega/posts/1/likes
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]
(inja dabare ke like kone va chon esmesh hast amale unlike sorat migire)
        status = 200 OK

        response body:{
    "likes_count": 2,
    "Liked_By": [
        {
            "username": "ghazal"
        },
        {
            "username": "Shaghayegh"
        }
    ]
}
**********************************************************

GET    http://127.0.0.1:8000/communities/sega/posts/1/likes
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 200 OK

        response body:[
    {
        "likes_count": 2,
        "Liked_By": [
            {
                "username": "ghazal"
            },
            {
                "username": "Shaghayegh"
            }
        ]
    }
]
**********************************************************
CODE:
var myHeaders = new Headers();
myHeaders.append("Authorization", "Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a");

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8000/communities/sega/posts/1/likes", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


**********************************************************
**********************************************************
Comments
**********************************************************
**********************************************************
All of the urls are like this for create comment and get all comments:
	http://127.0.0.1:8000/communities/communityID/posts/<id>/comments

All of the urls are like this for like the comment:
	http://127.0.0.1:8000/communities/communityID/posts/<id>/comments/<cm_id>/likes


POST,GET    http://127.0.0.1:8000/communities/sega/posts/1/comments
        
  [{"key":"Authorization","value":"Token 4f6a8f1242930491b188566b4a141bffe46da3c6","description":"","type":"text","enabled":true}]
        (join nabashe)
        status = 403 Forbidden

        response body:{
    "detail": "You do not have permission to perform this action."
}

**********************************************************
POST,GET    http://127.0.0.1:8000/communities/sega/posts/1/comments
        
  [{"key":"Authorization","value":"Token ","description":"","type":"text","enabled":true}]
  (without login)

        status = 401 Unauthorized

        response body:{
    "detail": "Authentication credentials were not provided."
}

**********************************************************
POST    http://127.0.0.1:8000/communities/sega/posts/1/comments
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 200 OK
        body:{
    "text":"anything you like"
}
        response body:{
    "text": "anything you like",
    "time": "2020-12-11T22:44:46.783760Z",
    "author": "amyrose",
    "id": 12,
    "AllPeopleLiked": []
}
**********************************************************
GET    http://127.0.0.1:8000/communities/sega/posts/9/comments
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 200 OK

        response body:[
    {
        "text": "first try of like model in comment",
        "time": "2020-12-10T04:54:58.830209Z",
        "author": "amyrose",
        "id": 8,
        "AllPeopleLiked": [
            {
                "likes_count": 1,
                "Liked_By": [
                    {
                        "username": "amyrose"
                    }
                ]
            }
        ]
    },
    {
        "text": "second try of like model in comment",
        "time": "2020-12-10T04:56:58.761902Z",
        "author": "amyrose",
        "id": 9,
        "AllPeopleLiked": [
            {
                "likes_count": 1,
                "Liked_By": [
                    {
                        "username": "amyrose"
                    }
                ]
            }
        ]
    },
    {
        "text": "new comment",
        "time": "2020-12-11T15:32:28.931525Z",
        "author": "amyrose",
        "id": 10,
        "AllPeopleLiked": [
            {
                "likes_count": 1,
                "Liked_By": [
                    {
                        "username": "amyrose"
                    }
                ]
            }
        ]
    }
]
**********************************************************
POST    http://127.0.0.1:8000/communities/sega/posts/1/comments
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 400 Bad Request
        body:{}

        response body:{
    "text": [
        "This field is required."
    ]
}
**********************************************************
POST    http://127.0.0.1:8000/communities/sega/posts/1/comments
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 400 Bad Request
        body:{
    "text":""
}

        response body:{
    "text": [
        "This field may not be blank."
    ]
}
**********************************************************
POST,GET    http://127.0.0.1:8000/communities/sega/posts/1/comments/1/likes
        
  [{"key":"Authorization","value":"Token 4f6a8f1242930491b188566b4a141bffe46da3c6","description":"","type":"text","enabled":true}]
        (join nabashe)
        status = 403 Forbidden

        response body:{
    "detail": "You do not have permission to perform this action."
}

**********************************************************
POST,GET    http://127.0.0.1:8000/communities/sega/posts/1/comments/1/likes
        
  [{"key":"Authorization","value":"Token ","description":"","type":"text","enabled":true}]
  (without login)

        status = 401 Unauthorized

        response body:{
    "detail": "Authentication credentials were not provided."
}
**********************************************************
GET    http://127.0.0.1:8000/communities/sega/posts/1/comments/1/likes
        
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 200 OK

}

        response body: [
    {
        "likes_count": 1,
        "Liked_By": [
            {
                "username": "amyrose"
            }
        ]
    }
]
**********************************************************
POST    http://127.0.0.1:8000/communities/sega/posts/1/comments/1/likes

( inja ta hala like nakarde va bar avaleshe)

  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 200 OK

}

        response body:{
    "likes_count": 1,
    "Liked_By": [
        {
            "username": "amyrose"
        }
    ]
}

**********************************************************
POST    http://127.0.0.1:8000/communities/sega/posts/1/comments/1/likes
        
(inja ghablan like karde va dobare ro like zade va inja amale unlike sorat migire)
    
  [{"key":"Authorization","value":"Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a","description":"","type":"text","enabled":true}]

        status = 200 OK

}

        response body:{
    "likes_count": 0,
    "Liked_By": []
}
}
*****************************************************
SPRINT4
*****************************************************

************************************************************************
 DELETE A Post
************************************************************************
All of the urls are like this for create comment and get all comments:
	http://127.0.0.1:8000/communities/communityID/posts/<id>


DELETE  url:http://127.0.0.1:8000/communities/sega/posts/14
Authorization: Token a3660da6f44078176ff90cfe353265b5d09c4afd  --> inja fard ozve community hast vali owner ya sazande ye post nist

status= 403 Forbidden

response body:{
    "detail": "You do not have permission to perform this action."
}

************************************************************************
DELETE  url:http://127.0.0.1:8000/communities/sega/posts/14
Authorization: Token ec3ac392aac9a921a1ddeda5b42f8a236e2d1645  --> inja fard ozve community nist 

status= 403 Forbidden

response body:{
    "detail": "You do not have permission to perform this action."
}
************************************************************************
DELETE  url:http://127.0.0.1:8000/communities/sega/posts/14
Authorization: Token   --> inja login nakarde

status= 401 Unauthorized

response body:{
    "detail": "Authentication credentials were not provided."
}

************************************************************************
DELETE  url:http://127.0.0.1:8000/communities/sega/posts/14
Authorization: Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a  --> inja ham woner hast va ham sazande !
(inja kamel pak mishe va age url sho bezani error mikhori ke vojod nadare)
status= 204 No Content

response body:


************************************************************************
UNREPORT
only owner of the community has this permission
all urls should be like this:
    http://127.0.0.1:8000/communities/communityID/posts/postID/unreport

DELETE  url: http://127.0.0.1:8000/communities/sega/posts/5/unreport
        headers:
            Authorization: Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a
            (this token is amyrose which is owner of "sega")
        status: 404 Not Found
        response body: "Post Not found"
************************************************************************
DELETE url: http://127.0.0.1:8000/communities/ghazal_z_n/posts/7/unreport
        headers:
            Authorization: Token a3660da6f44078176ff90cfe353265b5d09c4afd
            (this token is for owner of "ghazal_z_n")
        status: 400 Bad Request
        response body: "This post has not been reported before"

************************************************************************
DELETE url: http://127.0.0.1:8000/communities/ghazal_z_n/posts/7/unreport
        headers:
            Authorization: Token 0020c23834306dcdaca35af0ae7cb0a86ce27ff6
            (sb who is not owner)
        status: 403 Forbidden
        response body:
        {
    "detail": "You do not have permission to perform this action."
}
        
************************************************************************
DELETE    url: http://127.0.0.1:8000/communities/ghazal_z_n/posts/6/unreport
        headers:
            Authorization: Token a3660da6f44078176ff90cfe353265b5d09c4afd
            (this token is for owner of "ghazal_z_n")
        status: 204 No Content

************************************************************************
if you unreport it once & then again try to unreport:
DELETE    url: http://127.0.0.1:8000/communities/ghazal_z_n/posts/6/unreport
        headers:
            Authorization: Token a3660da6f44078176ff90cfe353265b5d09c4afd
            (this token is for owner of "ghazal_z_n")
        status: 400 Bad Request
        response body: "This post has not been reported before"

************************************************************************

get list of users with their token:
GET     url: http://127.0.0.1:8000/users

        status: 200 OK
        response body: 
[
    {
        "username": "amyrose",
        "email": "amy78rose@gmail.com",
        "token": "4250c9d434ff4f5ac09ce987e417cb4af306a44a"
    },
    {
        "username": "amyrose78",
        "email": "parisa78alaie@gmail.com",
        "token": "ec3ac392aac9a921a1ddeda5b42f8a236e2d1645"
    },
    {
        "username": "amy78rose",
        "email": "parisa_alaie@comp.iust.ac.ir",
        "token": "9704648cba97a3aab6fc3c6e381cd3893d37b3db"
    },
    {
        "username": "myusername",
        "email": "myemail@gmail.com",
        "token": "7fc0d1466143982dd7372d3fc67ed150f955392f"
    },
    {
        "username": "ghazal_z",
        "email": "ghzamaninejad@gmail.com",
        "token": "d897b7d6887cb9c2508b7924e8976ddc3b65b351"
    },
    {
        "username": "n_zeyn",
        "email": "neuhdn@ndjf.com",
        "token": "3d352f5e3253b4b5a0fc67ee433c1817a8c82a16"
    },
    {
        "username": "negar zeyn",
        "email": "negar@gmail.com",
        "token": "092f9e7e7e1f98c561a84be7f3c9d96bb6b0a26e"
    },
    {
        "username": "nksnfckj",
        "email": "nezhad@ghazal.com",
        "token": "74e4e2bf20cfb166067f4d08de6c8587b266b42b"
    },
    {
        "username": "naaaaaaaa",
        "email": "areee@na.com",
        "token": "460e2b0e371d3a8d5b9acdfb00a6fcd936e1e91a"
    },
    {
        "username": "negarrrrrrr",
        "email": "sana@saba.com",
        "token": "057a56759e43b17cd955857cf4392edb79db53a8"
    },
    {
        "username": "befahmnafahm",
        "email": "khahesh@pls.com",
        "token": "fc8d53ffe40ffd5172267362cd71d438ec0cec2f"
    },
    {
        "username": "bemiiiirrr",
        "email": "marg@kill.com",
        "token": "74c9aefab031922b3ae83b38dd6b4e88a5ea0447"
    },
    {
        "username": "areYouEnsan???",
        "email": "lakhahar@lamadar.com",
        "token": "eefca811b50a5abfe3c48b821f96de0e33638be9"
    },
    {
        "username": "zeynnnn",
        "email": "zeynnn@zeyn.com",
        "token": "57a61a620f589e8327662ed6a443a71f8afe8348"
    },
    {
        "username": "sharare",
        "email": "mobasher@gmail.com",
        "token": "4f6a8f1242930491b188566b4a141bffe46da3c6"
    },
    {
        "username": "parisa",
        "email": "amy78rosnfsedjf@misj.com",
        "token": "1cb5ba04114e2d21dc35f2a2316df1e9b454315c"
    },
    {
        "username": "parpar",
        "email": "pariiiiii@gmail.com",
        "token": "a00456c6de0cd5ea426bd5c3c3f6206cce2e9160"
    },
    {
        "username": "sabajooon",
        "email": "sabajoon@joon.com",
        "token": "0020c23834306dcdaca35af0ae7cb0a86ce27ff6"
    },
    {
        "username": "negar zeynalabedin",
        "email": "n.zeyn10@gmail.com",
        "token": "85a608a1eaba4fdb0aa38a2de2d4179b32468f0a"
    },
    {
        "username": "ghazal",
        "email": "parisa@gmail.com",
        "token": "a3660da6f44078176ff90cfe353265b5d09c4afd"
    },
    {
        "username": "rostamkhani",
        "email": "jhgfds@dfghj.com",
        "token": "4ed1e1e4199b40c985597a7b153ebb2ef525ffcb"
    },
    {
        "username": "yahosein",
        "email": "yahosein@hos.com",
        "token": "7e4ee48f81eba38f27078f68563abb2e01dfa3c5"
    },
    {
        "username": "zeyn",
        "email": "zeyn@zeyn.com",
        "token": "d4ec98d84bcb4fc68388b671bed4e6ccae55a1e6"
    },
    {
        "username": "Shaghayegh",
        "email": "mobashers313@gmail.com",
        "token": "9a686572931b43968975dbdfe8753b6987f955d3"
    }
]


***********************************************************************************************************
Fix SPRINT2
MULTI FILE

first use this url for uploading all the files of a post (you should upload files one by one and save the ids in response):
POST 	http://127.0.0.1:8000/upload-file

	form data:
		uploaded_file: <upload your file>
	headers:
		Authorization: Token 9a686572931b43968975dbdfe8753b6987f955d3
	status: 201 Created
	response body:
{
    "uploaded_file": "http://127.0.0.1:8000/media/posts/Clock_ZLBxCZE.jpg",
    "id": 7
}

POST 	http://127.0.0.1:8000/upload-file
	form data:
		uploaded_file: <upload your file>
	headers:
		Authorization: Token 9a686572931b43968975dbdfe8753b6987f955d3
	status: 201 Created
	response body:
{
    "uploaded_file": "http://127.0.0.1:8000/media/posts/math2.jpg",
    "id": 8
}

**********

then, use this url for creating the post:
POST 	http://127.0.0.1:8000/communities/sega/posts

	headers:
		Authorization: Token 9a686572931b43968975dbdfe8753b6987f955d3

	x-www-form-urlncoded:
		caption: i love coding
		files: 7
		files: 8
(Note that if you'd like to post multiple files, you should repeat the "files"
	e.g:
	files:1
	files:2
	will make a post with 2files that were uploaded before and you have saved their ids. their ids were 1,2
)
	status: 201 Created
	response body:
{
    "files": [
        7,
        8
    ],
    "urls": [
        {
            "uploaded_file": "http://127.0.0.1:8000/media/posts/Clock_ZLBxCZE.jpg"
        },
        {
            "uploaded_file": "http://127.0.0.1:8000/media/posts/math2.jpg"
        }
    ],
    "caption": "i love coding",
    "author": "Shaghayegh",
    "time": "2020-12-17T18:18:41.983651+03:30",
    "id": 13,
    "communityID": "sega"
}

also if you don't like to upload any files, you can create the post using "caption" in the body.

***********************************************************************************************************
Get all posts of a community:

GET http://127.0.0.1:8000/communities/sega/posts
(it is allow any, so no need for token)

	status: 200 OK
	response body:
[
    {
        "files": [],
        "urls": [],
        "caption": "Have a nice day *_*",
        "Author": "parpar",
        "Time": "2020-12-12 19:18:22.387119+00:00",
        "id": 1,
        "AllPeopleReported": [],
        "AllPeopleLiked": [
            {
                "likes_count": 2,
                "Liked_By": [
                    {
                        "username": "amyrose"
                    },
                    {
                        "username": "Shaghayegh"
                    }
                ]
            }
        ]
    },
    {
        "files": [],
        "urls": [],
        "caption": "i'm shaghayegh. i love codinf",
        "Author": "Shaghayegh",
        "Time": "2020-12-12 19:19:35.402618+00:00",
        "id": 2,
        "AllPeopleReported": [],
        "AllPeopleLiked": [
            {
                "likes_count": 2,
                "Liked_By": [
                    {
                        "username": "amyrose"
                    },
                    {
                        "username": "Shaghayegh"
                    }
                ]
            }
        ]
    },
    {
        "files": [],
        "urls": [],
        "caption": "see my new painting",
        "Author": "Shaghayegh",
        "Time": "2020-12-12 19:20:04.935326+00:00",
        "id": 3,
        "AllPeopleReported": [
            {
                "reports_count": 2,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    },
                    {
                        "username": "Shaghayegh"
                    }
                ]
            }
        ],
        "AllPeopleLiked": []
    },
    {
        "files": [],
        "urls": [],
        "caption": "i love sonic!",
        "Author": "amyrose",
        "Time": "2020-12-12 19:20:30.460851+00:00",
        "id": 4,
        "AllPeopleReported": [],
        "AllPeopleLiked": []
    },
    {
        "files": [
            1
        ],
        "urls": [
            {
                "uploaded_file": "/media/posts/alanturing4-2x.jpg"
            }
        ],
        "caption": "best post ever!",
        "Author": "Shaghayegh",
        "Time": "2020-12-17 14:13:17.526178+00:00",
        "id": 10,
        "AllPeopleReported": [],
        "AllPeopleLiked": []
    },
    {
        "files": [],
        "urls": [],
        "caption": "last try :(",
        "Author": "Shaghayegh",
        "Time": "2020-12-17 14:34:14.963245+00:00",
        "id": 11,
        "AllPeopleReported": [],
        "AllPeopleLiked": []
    },
    {
        "files": [
            4,
            5,
            6
        ],
        "urls": [
            {
                "uploaded_file": "/media/posts/download_oKgxmH4.jpg"
            },
            {
                "uploaded_file": "/media/posts/howmuchlove.jpeg"
            },
            {
                "uploaded_file": "/media/posts/Clock.jpg"
            }
        ],
        "caption": "a post with three files",
        "Author": "Shaghayegh",
        "Time": "2020-12-17 14:47:42.898817+00:00",
        "id": 12,
        "AllPeopleReported": [],
        "AllPeopleLiked": []
    },
    {
        "files": [
            7,
            8
        ],
        "urls": [
            {
                "uploaded_file": "/media/posts/Clock_ZLBxCZE.jpg"
            },
            {
                "uploaded_file": "/media/posts/math2.jpg"
            }
        ],
        "caption": "i love coding",
        "Author": "Shaghayegh",
        "Time": "2020-12-17 14:48:41.983651+00:00",
        "id": 13,
        "AllPeopleReported": [],
        "AllPeopleLiked": []
    },
    {
        "files": [
            9
        ],
        "urls": [
            {
                "uploaded_file": "/media/posts/math2_8Sakur8.jpg"
            }
        ],
        "caption": "i love coding",
        "Author": "Shaghayegh",
        "Time": "2020-12-17 14:58:06.999182+00:00",
        "id": 14,
        "AllPeopleReported": [],
        "AllPeopleLiked": []
    }
]
	

***********************************************************************************************************
Get info of a post :

GET http://127.0.0.1:8000/communities/sega/posts/4

	headers:
		Authorization Token 9a686572931b43968975dbdfe8753b6987f955d3
		(this token has joined the community)
	status: 200 OK
	response body:
{
    "files": [],
    "urls": [],
    "caption": "i love sonic!",
    "Author": "amyrose",
    "Time": "2020-12-12 19:20:30.460851+00:00",
    "id": 4,
    "AllPeopleReported": [],
    "AllPeopleLiked": []
}
***********************************************************************************************************
GET http://127.0.0.1:8000/communities/sega/posts/4

	headers:
		Authorization Token 74e4e2bf20cfb166067f4d08de6c8587b266b42b
		(this token hasn't joined the community)
	status: 403 Forbidden
	response body:
{
    "detail": "You do not have permission to perform this action."
}
***********************************************************************************************************
if you enter a post that doesn't belong to the community, you will get 404
GET http://127.0.0.1:8000/communities/sega/posts/6

	headers:
		Authorization Token 9a686572931b43968975dbdfe8753b6987f955d3
		(this token has joined the community)
	status: 404 Not Found
	response body: "Post Not found"


***********************************************************************************************************
Delete a post:
for deleting, you should be owner of the community or the author of the post

DELETE http://127.0.0.1:8000/communities/sega/posts/12	

	headers:
		Authorization Token 9a686572931b43968975dbdfe8753b6987f955d3
	status: 403 Forbidden
	response body: 
{
    "detail": "You do not have permission to perform this action."
}
***********************************************************************************************************

DELETE http://127.0.0.1:8000/communities/sega/posts/12	

	headers:
		Authorization Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a

	status: 204 No Content
***********************************************************************************************************
Report post

POST http://127.0.0.1:8000/communities/sega/posts/10/reports

(for reporting you should have joined the community)
	headers: 
		Authorization Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a


	status: 201 Created
	response body:
{
    "Reportpost": [
        {
            "files": [],
            "urls": [],
            "caption": "this a nice caption!",
            "author": "Shaghayegh",
            "time": "2020-12-17T14:13:17.526178Z",
            "id": 10,
            "communityID": "sega"
        }
    ],
    "reports_count": 1,
    "Reported_By": [
        {
            "username": "amyrose"
        }
    ]
}

***********************************************************************************************************
POST http://127.0.0.1:8000/communities/sega/posts/10/reports

if you try to report it again:
	status: 400 Bad Request
	response body: "You have already reported this post"

***********************************************************************************************************
Getting all the reported posts of a community:
(you should be owner of the community)
GET 	http://127.0.0.1:8000/communities/sega/post/reports

	status: 200 OK
	response body:
[
    {
        "files": [],
        "urls": [],
        "caption": "see my new painting",
        "author": "Shaghayegh",
        "time": "2020-12-12T19:20:04.935326Z",
        "id": 3,
        "AllPeopleReports": [
            {
                "reports_count": 2,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    },
                    {
                        "username": "Shaghayegh"
                    }
                ]
            }
        ]
    },
    {
        "files": [],
        "urls": [],
        "caption": "this a nice caption!",
        "author": "Shaghayegh",
        "time": "2020-12-17T14:13:17.526178Z",
        "id": 10,
        "AllPeopleReports": [
            {
                "reports_count": 3,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    },
                    {
                        "username": "parpar"
                    },
                    {
                        "username": "Shaghayegh"
                    }
                ]
            }
        ]
    },
    {
        "files": [],
        "urls": [],
        "caption": "last try :(",
        "author": "Shaghayegh",
        "time": "2020-12-17T14:34:14.963245Z",
        "id": 11,
        "AllPeopleReports": [
            {
                "reports_count": 1,
                "Reported_By": [
                    {
                        "username": "parpar"
                    }
                ]
            }
        ]
    },
    {
        "files": [
            9
        ],
        "urls": [
            {
                "uploaded_file": "/media/posts/math2_8Sakur8.jpg"
            }
        ],
        "caption": "i love coding",
        "author": "Shaghayegh",
        "time": "2020-12-17T14:58:06.999182Z",
        "id": 14,
        "AllPeopleReports": [
            {
                "reports_count": 2,
                "Reported_By": [
                    {
                        "username": "amyrose"
                    },
                    {
                        "username": "Shaghayegh"
                    }
                ]
            }
        ]
    }
]
***********************************************************************************************************
SPRINT5
PAGINATION:
GET http://127.0.0.1:8000/mycommunities/?page=1

{
    "count": 7,
    "next": null,
    "previous": null,
    "results": [
        {
            "name": "ghazal",
            "communityID": "ghazal_z_n",
            "field": "others",
            "description": "salamsalam",
            "photo": "http://127.0.0.1:8000/media/%DB%B2%DB%B0%DB%B1%DB%B8-%DB%B0%DB%B8-%DB%B0%DB%B8-%DB%B1%DB%B5.%DB%B4%DB%B3.%DB%B0%DB%B1.png"
        },
        {
            "name": "sonic",
            "communityID": "sega",
            "field": "others",
            "description": "",
            "photo": "http://127.0.0.1:8000/media/sonic_QAy7mHd.jpg"
        },
        {
            "name": "sonic",
            "communityID": "sega2",
            "field": "art",
            "description": "",
            "photo": null
        },
        {
            "name": "sana",
            "communityID": "this_is_our_community",
            "field": "anime",
            "description": "our team loves anime!",
            "photo": null
        },
        {
            "name": "linkinpark",
            "communityID": "linkinparkID",
            "field": "music",
            "description": "linkinpark rules",
            "photo": "http://127.0.0.1:8000/media/1401210370000-linkin-park.jpg"
        },
        {
            "name": "Chao",
            "communityID": "chao",
            "field": "others",
            "description": "Chao Chao!",
            "photo": "http://127.0.0.1:8000/media/9c66e2a01a7be12109ea5393dd936d55.gif"
        },
        {
            "name": "Sonic The Hedgehog",
            "communityID": "sonicsega",
            "field": "others",
            "description": "",
            "photo": "http://127.0.0.1:8000/media/images_1.jpg"
        }
    ]
}

***********************************************************************************************************
GET http://127.0.0.1:8000/mycommunities/?page=2
status = 404 Not Found
{
    "detail": "Invalid page."
}
***********************************************************************************************************

GET http://127.0.0.1:8000/communities/sega/posts/?page=1
(POST url has changed too)

{
    "count": 9,
    "next": null,
    "previous": null,
    "results": [
        {
            "files": [],
            "urls": [],
            "caption": "Have a nice day *_*",
            "Author": "parpar",
            "Time": "2020-12-12 19:18:22.387119+00:00",
            "id": 1,
            "AllPeopleReported": [],
            "AllPeopleLiked": [
                {
                    "likes_count": 2,
                    "Liked_By": [
                        {
                            "username": "amyrose"
                        },
                        {
                            "username": "Shaghayegh"
                        }
                    ]
                }
            ]
        },
        {
            "files": [],
            "urls": [],
            "caption": "i'm shaghayegh. i love codinf",
            "Author": "Shaghayegh",
            "Time": "2020-12-12 19:19:35.402618+00:00",
            "id": 2,
            "AllPeopleReported": [],
            "AllPeopleLiked": [
                {
                    "likes_count": 2,
                    "Liked_By": [
                        {
                            "username": "amyrose"
                        },
                        {
                            "username": "Shaghayegh"
                        }
                    ]
                }
            ]
        },
        {
            "files": [],
            "urls": [],
            "caption": "see my new painting",
            "Author": "Shaghayegh",
            "Time": "2020-12-12 19:20:04.935326+00:00",
            "id": 3,
            "AllPeopleReported": [
                {
                    "reports_count": 2,
                    "Reported_By": [
                        {
                            "username": "amyrose"
                        },
                        {
                            "username": "Shaghayegh"
                        }
                    ]
                }
            ],
            "AllPeopleLiked": []
        },
        {
            "files": [],
            "urls": [],
            "caption": "i love sonic!",
            "Author": "amyrose",
            "Time": "2020-12-12 19:20:30.460851+00:00",
            "id": 4,
            "AllPeopleReported": [],
            "AllPeopleLiked": []
        },
        {
            "files": [],
            "urls": [],
            "caption": "this a nice caption!",
            "Author": "Shaghayegh",
            "Time": "2020-12-17 14:13:17.526178+00:00",
            "id": 10,
            "AllPeopleReported": [
                {
                    "reports_count": 3,
                    "Reported_By": [
                        {
                            "username": "amyrose"
                        },
                        {
                            "username": "parpar"
                        },
                        {
                            "username": "Shaghayegh"
                        }
                    ]
                }
            ],
            "AllPeopleLiked": [
                {
                    "likes_count": 3,
                    "Liked_By": [
                        {
                            "username": "amyrose"
                        },
                        {
                            "username": "parpar"
                        },
                        {
                            "username": "Shaghayegh"
                        }
                    ]
                }
            ]
        },
        {
            "files": [],
            "urls": [],
            "caption": "last try :(",
            "Author": "Shaghayegh",
            "Time": "2020-12-17 14:34:14.963245+00:00",
            "id": 11,
            "AllPeopleReported": [
                {
                    "reports_count": 1,
                    "Reported_By": [
                        {
                            "username": "parpar"
                        }
                    ]
                }
            ],
            "AllPeopleLiked": [
                {
                    "likes_count": 1,
                    "Liked_By": [
                        {
                            "username": "parpar"
                        }
                    ]
                }
            ]
        },
        {
            "files": [
                9
            ],
            "urls": [
                {
                    "uploaded_file": "/media/posts/math2_8Sakur8.jpg"
                }
            ],
            "caption": "i love coding",
            "Author": "Shaghayegh",
            "Time": "2020-12-17 14:58:06.999182+00:00",
            "id": 14,
            "AllPeopleReported": [
                {
                    "reports_count": 2,
                    "Reported_By": [
                        {
                            "username": "amyrose"
                        },
                        {
                            "username": "Shaghayegh"
                        }
                    ]
                }
            ],
            "AllPeopleLiked": []
        },
        {
            "files": [],
            "urls": [],
            "caption": "10th",
            "Author": "Shaghayegh",
            "Time": "2020-12-17 15:18:00.823486+00:00",
            "id": 15,
            "AllPeopleReported": [],
            "AllPeopleLiked": []
        },
        {
            "files": [],
            "urls": [],
            "caption": "nice day :)",
            "Author": "Shaghayegh",
            "Time": "2020-12-31 22:46:22.367188+00:00",
            "id": 16,
            "AllPeopleReported": [],
            "AllPeopleLiked": []
        }
    ]
}

***********************************************************************************************************
GET http://127.0.0.1:8000/communities/sega/post/reports/?page=1

{
    "count": 9,
    "next": null,
    "previous": null,
    "results": [
        {
            "files": [],
            "urls": [],
            "caption": "see my new painting",
            "author": "Shaghayegh",
            "time": "2020-12-12T19:20:04.935326Z",
            "id": 3,
            "AllPeopleReports": [
                {
                    "reports_count": 2,
                    "Reported_By": [
                        {
                            "username": "amyrose"
                        },
                        {
                            "username": "Shaghayegh"
                        }
                    ]
                }
            ]
        },
        {
            "files": [],
            "urls": [],
            "caption": "this a nice caption!",
            "author": "Shaghayegh",
            "time": "2020-12-17T14:13:17.526178Z",
            "id": 10,
            "AllPeopleReports": [
                {
                    "reports_count": 3,
                    "Reported_By": [
                        {
                            "username": "amyrose"
                        },
                        {
                            "username": "parpar"
                        },
                        {
                            "username": "Shaghayegh"
                        }
                    ]
                }
            ]
        },
        {
            "files": [],
            "urls": [],
            "caption": "last try :(",
            "author": "Shaghayegh",
            "time": "2020-12-17T14:34:14.963245Z",
            "id": 11,
            "AllPeopleReports": [
                {
                    "reports_count": 1,
                    "Reported_By": [
                        {
                            "username": "parpar"
                        }
                    ]
                }
            ]
        },
        {
            "files": [
                9
            ],
            "urls": [
                {
                    "uploaded_file": "/media/posts/math2_8Sakur8.jpg"
                }
            ],
            "caption": "i love coding",
            "author": "Shaghayegh",
            "time": "2020-12-17T14:58:06.999182Z",
            "id": 14,
            "AllPeopleReports": [
                {
                    "reports_count": 2,
                    "Reported_By": [
                        {
                            "username": "amyrose"
                        },
                        {
                            "username": "Shaghayegh"
                        }
                    ]
                }
            ]
        }
    ]
}

***********************************************************************************************************
GET http://127.0.0.1:8000/communities/sega/posts/2/comments

{
    "count": 4,
    "next": null,
    "previous": null,
    "results": [
        {
            "text": "wow what a nice post!",
            "time": "2020-12-12T20:00:57.265208Z",
            "author": "Shaghayegh",
            "id": 1,
            "AllPeopleLiked": [
                {
                    "likes_count": 2,
                    "Liked_By": [
                        {
                            "username": "amyrose"
                        },
                        {
                            "username": "parpar"
                        }
                    ]
                }
            ]
        },
        {
            "text": "may i repost it?",
            "time": "2020-12-12T20:01:11.344473Z",
            "author": "Shaghayegh",
            "id": 2,
            "AllPeopleLiked": []
        },
        {
            "text": "feel free to repost :)",
            "time": "2020-12-12T20:01:51.740801Z",
            "author": "Shaghayegh",
            "id": 3,
            "AllPeopleLiked": []
        },
        {
            "text": "feel free to repost :)",
            "time": "2020-12-12T20:02:03.007311Z",
            "author": "amyrose",
            "id": 4,
            "AllPeopleLiked": []
        }
    ]
}

***********************************************************************************************************
get the events that their endDate hasnot passed yet
GET http://127.0.0.1:8000/communities/sega/new-events/?page=1
	(has joined or isOwner permission)
	headers:
		Authorization Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a
	status: 200 OK
	response body:
{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "photo": null,
            "title": "happy new year event!",
            "description": "",
            "startDate": "2020-12-12T20:04:00Z",
            "endDate": "2021-01-06T20:03:00Z",
            "Creator": "amyrose",
            "joined_users_count": 1,
            "users_joined": [
                {
                    "username": "amyrose"
                }
            ],
            "id": 4
        }
    ]
}

***********************************************************************************************************
# SPRINT6

get communities on homepage
everyone has the permission
returns the 8 communities with most members count
GET http://127.0.0.1:8000/homepage/communities


[
    {
        "name": "ghazal",
        "communityID": "ghazal_z_n",
        "field": "others",
        "description": "salamsalam",
        "photo": "http://127.0.0.1:8000/media/%DB%B2%DB%B0%DB%B1%DB%B8-%DB%B0%DB%B8-%DB%B0%DB%B8-%DB%B1%DB%B5.%DB%B4%DB%B3.%DB%B0%DB%B1.png",
        "owner_name": "ghazal",
        "admin_name": "ghazal",
        "members_name": [
            {
                "username": "parpar"
            },
            {
                "username": "negar zeynalabedin"
            },
            {
                "username": "ghazal"
            },
            {
                "username": "Shaghayegh"
            }
        ]
    },
    {
        "name": "linkinpark",
        "communityID": "linkinparkID",
        "field": "music",
        "description": "linkinpark rules",
        "photo": "http://127.0.0.1:8000/media/1401210370000-linkin-park.jpg",
        "members_name": [
            {
                "username": "amyrose"
            },
            {
                "username": "sharare"
            },
            {
                "username": "zeyn"
            },
            {
                "username": "Shaghayegh"
            }
        ]
    },
    {
        "name": "sonic",
        "communityID": "sega",
        "field": "others",
        "description": "",
        "photo": "http://127.0.0.1:8000/media/sonic_QAy7mHd.jpg",
        "owner_name": "amyrose",
        "admin_name": "amyrose",
        "members_name": [
            {
                "username": "amyrose"
            },
            {
                "username": "parpar"
            },
            {
                "username": "Shaghayegh"
            }
        ]
    },
    {
        "name": "light",
        "communityID": "light",
        "field": "others",
        "description": "We live in a cave.\ncome join us!",
        "photo": "http://127.0.0.1:8000/media/yjc-6307451.jpg",
        "members_name": [
            {
                "username": "amyrose"
            },
            {
                "username": "negar zeynalabedin"
            }
        ]
    },
    {
        "name": "ali",
        "communityID": "ali@young",
        "field": "celebrities",
        "description": "ali loves anime and wants to share with you!",
        "photo": null,
        "members_name": [
            {
                "username": "parpar"
            }
        ]
    },
    {
        "name": "Chao",
        "communityID": "chao",
        "field": "others",
        "description": "Chao Chao!",
        "photo": "http://127.0.0.1:8000/media/9c66e2a01a7be12109ea5393dd936d55.gif",
        "members_name": [
            {
                "username": "Shaghayegh"
            }
        ]
    },
    {
        "name": "painting community",
        "communityID": "drawings",
        "field": "others",
        "description": "join us\nin our community.\nWe will teach you \nmany things!",
        "photo": "http://127.0.0.1:8000/media/Quotefancy-4774883-3840x2160.jpg",
        "owner_name": "sharare",
        "members_name": [
            {
                "username": "sharare"
            }
        ]
    },
    {
        "name": "kpop",
        "communityID": "kpop",
        "field": "others",
        "description": "kpop lovers!",
        "photo": "http://127.0.0.1:8000/media/93e3ef18-8dd9-11ea-a674-527cfdef49ee_image_hires_105518.jpg",
        "members_name": [
            {
                "username": "negar zeynalabedin"
            }
        ]
    }
]
************************************************************************************************
Notifications:
GET http://127.0.0.1:8000/users/notifications

	Headers:
		Authorization: Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a
		(this token is for amyrose)

	status: 200 OK

	response body:
[
    {
        "text": "type: like post\npost id: 20\ncommunityID: sega\nlikedby: Shaghayegh",
        "user": "amyrose",
        "id": 1
    },
    {
        "text": "type: comment\npost id: 20\ncommunityID: sega\ncommentedby: parpar\ncommentID: 17",
        "user": "amyrose",
        "id": 2
    },
    {
        "text": "type: delete post because of multiple reports\npost id: 17\ncommunityID: sega\ntime: 2020-12-19 16:09:03.023626+00:00",
        "user": "amyrose",
        "id": 3
    }
]

************************************************
GET http://127.0.0.1:8000/users/notifications/counts

	Headers:
		Authorization: Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a
		(this token is for amyrose)

	status: 200 OK
	response body: "2"
************************************************
GET http://127.0.0.1:8000/users/new-notifications

	Headers:
		Authorization: Token 4250c9d434ff4f5ac09ce987e417cb4af306a44a
		(this token is for amyrose)

	status: 200 OK
	response body:
[
    {
        "text": "type: like post\npost id: 20\ncommunityID: sega\nlikedby: Shaghayegh",
        "user": "amyrose",
        "id": 1
    },
    {
        "text": "type: comment\npost id: 20\ncommunityID: sega\ncommentedby: parpar\ncommentID: 17",
        "user": "amyrose",
        "id": 2
    }
]

(if you've gotten new notifications once, you won't see them again)
