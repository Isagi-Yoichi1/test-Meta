const axios2 = require("axios");

const BACKEND_URL = "http://localhost:3000";
const WS_URL = "ws://localhost:3001";

const axios = {
  post: async (...args) => {
    try {
      const res = await axios2.post(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  get: async (...args) => {
    try {
      const res = await axios2.get(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  put: async (...args) => {
    try {
      const res = await axios2.put(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  delete: async (...args) => {
    try {
      const res = await axios2.delete(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
};

// describe("Authentication", () => {
//   test("User is able to signup only once", async () => {
//     const username = "sahil" + Math.random();
//     const password = "123456";
//     const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type: "admin",
//     });
//     expect(response.statusCode).toBe(200);
//     const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type: "admin",
//     });
//     expect(updatedResponse.statusCode).toBe(400);
//   });

//   test("Signup request fails if the username is empty", async () => {
//     const username = `kirat-${Math.random()}`;
//     const password = `123456`;

//     const response = axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       password,
//     });
//     expect(response.statusCode.toBe(400));
//   });

//   test("SignIn succeds if the username and password is correct", async () => {
//     const username = `sahil-${Math.random()}`;
//     password = "123456";
//     await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//     });
//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username,
//       password,
//     });

//     expect(response.status).toBe(200);
//     expect(response.data.token).toBeDefined();
//   });

//   test("SignIn fails if the username and password are incorrect", async () => {
//     const username = `Sahil-${Math.random()}`;
//     const password = "123456";

//     await axios.post(`${BACKEND_URL}/api/v1/signUp`, {
//       username,
//       password,
//     });

//     const response = await axios.post(`${BACKEND_URL}/v1/api/signIn`, {
//       username: "WrongUsername",
//       password,
//     });
//     expect(response.statusCode).toBe(403);
//   });
// });

describe("Authentication", () => {
  test("User is able to sign up only once", async () => {
    const username = "kirat" + Math.random(); // kirat0.12331313
    const password = "123456";
    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    expect(response.status).toBe(200);
    const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    expect(updatedResponse.status).toBe(400);
  });

  test("Signup request fails if the username is empty", async () => {
    const username = `kirat-${Math.random()}`; // kirat-0.12312313
    const password = "123456";

    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      password,
    });

    expect(response.status).toBe(400);
  });

  test("Signin succeeds if the username and password are correct", async () => {
    const username = `kirat-${Math.random()}`;
    const password = "123456";

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });

    expect(response.status).toBe(200);
    expect(response.data.token).toBeDefined();
  });

  test("Signin fails if the username and password are incorrect", async () => {
    const username = `kirat-${Math.random()}`;
    const password = "123456";

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      role: "admin",
    });

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: "WrongUsername",
      password,
    });

    expect(response.status).toBe(403);
  });
});

// describe("User Metadata endpoints", () => {
//   let token = "";
//   let avatarId = "";
//   beforeAll(async () => {
//     const username = `sahil-${Math.random()}`;
//     const password = "123456";

//     await axios.post(`${BACKEND_URL}/v1/api/signup`, {
//       username,
//       password,
//       type: "admin",
//     });
//     const response = await axios.post(`${BACKEND_URL}/v1/api/signin`, {
//       username,
//       password,
//     });
//     token = response.data.token;
//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         name: "Timmy",
//       }
//     );

//     avatarId = avatarResponse.data.avatarId;
//   });

//   test("User can't update their metadata with a wrong avatar id", async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/user/metadata`,
//       {
//         avatarId: "12121232",
//       },
//       {
//         headers: { authorization: `Bearer ${token}` },
//       }
//     );
//     expect(response.statusCode).toBe(400);
//   });

//   test("User can upadte their metadata with the right avatar id", async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/user/metadata`,
//       {
//         avatarId,
//       },
//       {
//         headers: { authorization: `Bearer ${token}` },
//       }
//     );
//     expect(response.statusCode).toBe(200);
//   });
//   test("User is not able to update their metadata if the auth header is not present", async () => {
//     const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
//       avatarId,
//     });
//     expect(response.statusCode).toBe(403);
//   });
// });

// describe("User avatar information", () => {
//   let avatarId;
//   let token;
//   let userId;
//   beforeAll(async () => {
//     const username = `sahil-${Math.random()}`;
//     const password = "123456";

//     const signupResponse = await axios.post(`${BACKEND_URL}/v1/api/signup`, {
//       username,
//       password,
//       type: "admin",
//     });
//     userId = signupResponse.data.userId;
//     const response = await axios.post(`${BACKEND_URL}/v1/api/signin`, {
//       username,
//       password,
//     });
//     token = response.data.token;
//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         name: "Timmy",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     avatarId = avatarResponse.data.avatarId;
//   });

//   test("Get back avatar information for a user", async () => {
//     const response = await axios.get(
//       `${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`
//     );

//     expect(response.data.avatars.length).toBe(1);
//     expect(reposnse.data.avatars[0].userId).toBe(userId);
//   });

//   test("Available avatars lists the recently created avatar", async () => {
//     const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`);
//     expect(response.data.avatars.length).not.toBe(0);
//     const currentAvatar = response.data.avatara.find((x) => x.id == avatarId);
//     expect(currentAvatar).toBeDefined();
//   });
// });

// describe("Space information", () => {
//   let mapId;
//   let element1Id;
//   let element2Id;
//   let adminId;
//   let adminToken;
//   let userToken;
//   let userId;

//   beforeAll(async () => {
//     const username = `sahil-${Math.random()}`;
//     const password = "123456";

//     const signupResponse = await axios.post(`${BACKEND_URL}/v1/api/signup`, {
//       username,
//       password,
//       type: "admin",
//     });

//     adminId = signupResponse.data.userId;
//     const response = await axios.post(`${BACKEND_URL}/v1/api/signin`, {
//       username: username + "-user",
//       password,
//     });
//     adminToken = response.data.token;

//     const userSignupResponse = await axios.post(
//       `${BACKEND_URL}/v1/api/signup`,
//       {
//         username: username + "-user",
//         password,
//         type: "user",
//       }
//     );

//     userId = userSignupResponse.data.userId;
//     const userSigninResponse = await axios.post(
//       `${BACKEND_URL}/v1/api/signin`,
//       {
//         username,
//         password,
//       }
//     );
//     userToken = userSiginResponse.data.token;
//     const element1Response = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
//       },
//       {
//         headers: {
//           authorization: `Bearer ${admintToken}`,
//         },
//       }
//     );
//     const element2Response = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${adminToken}`,
//         },
//       }
//     );

//     element1Id = element1Response.data.id;
//     element2Id = element2Response.data.id;

//     const mapResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "100 person interview room",
//         defaultElements: [
//           {
//             elementId: element1Id,
//             x: 20,
//             y: 20,
//           },
//           {
//             elementId: element1Id,
//             x: 18,
//             y: 20,
//           },
//           {
//             elementId: element2Id,
//             x: 19,
//             y: 20,
//           },
//         ],
//       },
//       {
//         headers: {
//           authorization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     mapId = mapResponse.id;
//   });

//   test("User is able to create a space", async () => {
//     const response = axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//         mapId: mapId,
//       },
//       {
//         header: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(response.data.spaceId).toBeDefined();
//   });
//   test("User is able to create a space without mapId (Empty space)", async () => {
//     const response = axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//       },
//       {
//         header: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(response.data.spaceId).toBeDefined();
//   });
//   test("User is not able to create a space without mapId and dimensions", async () => {
//     const response = axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//       },
//       {
//         header: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(response.statusCode).toBe(400);
//   });
//   test("User is not able to delete a space that doesnt exist", async () => {
//     const response = await axios.delete(
//       `${BACKEND_URL}/api/v1/space/randomIdDoesntExist`,
//       {
//         header: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(response.statusCode).toBe(400);
//   });
//   test("User is able to delete a space that exist", async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//       },
//       {
//         header: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     const deleteResponse = await axios.delete(
//       `${BACKEND_URL}/api/v1/space/${response.data.spaceId}`,
//       {
//         header: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(deleteResponse.statusCode).toBe(200);
//   });
//   test("User should not be able to delete space created by another user", async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//       },
//       {
//         header: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     const deleteResponse = await axios.delete(
//       `${BACKEND_URL}/api/v1/space/${response.data.spaceId}`,
//       {
//         header: {
//           authorization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     expect(deleteResponse.statusCode).toBe(400);
//   });
//   test("Admin has no spaces initially", async () => {
//     const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`);
//     expect(response.data.spaces.length).toBe(0);
//   });
//   test("Admin has no spaces initially", async () => {
//     const spaceCreateResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/space/all`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//       },
//       {
//         header: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     const response = await axios.post(`${BACKEND_URL}/api/v1/spaces/all`, {
//       header: {
//         authorization: `Bearer ${userToken}`,
//       },
//     });
//     const filteredSpace = response.data.spaces.find(
//       (x) => x,
//       id == spaceCreateResponse.spaceId
//     );
//     expect(response.data.spaces.length).toBe(1);
//     expect(filteredSpace).toBeDefined();
//   });
// });

// describe("Arena endpoints", () => {
//   let mapId;
//   let element1Id;
//   let element2Id;
//   let adminId;
//   let adminToken;
//   let userToken;
//   let userId;
//   let spaceId;

//   beforeAll(async () => {
//     const username = `sahil-${Math.random()}`;
//     const password = "123456";

//     const signupResponse = await axios.post(`${BACKEND_URL}/v1/api/signup`, {
//       username,
//       password,
//       type: "admin",
//     });

//     adminId = signupResponse.data.userId;
//     const response = await axios.post(`${BACKEND_URL}/v1/api/signin`, {
//       username,
//       password,
//     });
//     adminToken = response.data.token;

//     const userSignupResponse = await axios.post(
//       `${BACKEND_URL}/v1/api/signup`,
//       {
//         username: username + "-user",
//         password,
//         type: "user",
//       }
//     );

//     userId = userSignupResponse.data.userId;
//     const userSigninResponse = await axios.post(
//       `${BACKEND_URL}/v1/api/signin`,
//       {
//         username: username + "-user",
//         password,
//       }
//     );
//     userToken = userSiginResponse.data.token;
//     const element1Response = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
//       },
//       {
//         headers: {
//           authorization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     const element2Response = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${adminToken}`,
//         },
//       }
//     );

//     element1Id = element1Response.data.id;
//     element2Id = element2Response.data.id;

//     const mapResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "100 person interview room",
//         defaultElements: [
//           {
//             elementId: element1Id,
//             x: 20,
//             y: 20,
//           },
//           {
//             elementId: element1Id,
//             x: 18,
//             y: 20,
//           },
//           {
//             elementId: element2Id,
//             x: 19,
//             y: 20,
//           },
//         ],
//       },
//       {
//         headers: {
//           authorization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     mapId = mapResponse.id;
//     const spaceResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//         mapId: mapId,
//       },
//       {
//         headers: { authorization: `Bearer ${userToken}` },
//       }
//     );
//     spaceId = spaceResponse.data.id;
//   });
//   test("Incorrect spaceId returns a 400", async () => {
//     const response = await axios.get(
//       `${BACKEND_URL}/api/v1/space/123kfehjhsdadw01`,
//       {
//         headers: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(response.status).toBe(400);
//   });
//   test("Correct spaceId returns all the elements", async () => {
//     const response = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
//       headers: {
//         authorization: `Bearer ${userToken}`,
//       },
//     });
//     expect(response.data.dimensions).toBe("100x200");
//     expect(response.data.elements.length).toBe(3);
//   });
//   test("Delete endpoint is able to delete an element", async () => {
//     const response = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
//       headers: {
//         authorization: `Bearer ${userToken}`,
//       },
//     });
//     await axios.delete(
//       `${BACKEND_URL}/api/v1/space/element`,
//       {
//         spaceId: spaceId,
//         elementId: response.data.elements[0].id,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     const newResponse = await axios.get(
//       `${BACKEND_URL}/api/v1/space/${spaceId}`,
//       {
//         headers: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(newResponse.data.elements.length).toBe(2);
//   });
//   test("Adding an element fails if element lies outside the dimensions", async () => {
//     await axios.post(
//       `${BACKEND_URL}/api/v1/space/element`,
//       {
//         elementId: element1Id,
//         spaceId: spaceId,
//         x: 100000,
//         y: 2100000,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     const newResponse = await axios.get(
//       `${BACKEND_URL}/api/v1/space/${spaceId}`,
//       {
//         headers: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(newResponse.status).toBe(404);
//   });
//   test("Adding an element works as expected", async () => {
//     await axios.post(
//       `${BACKEND_URL}/api/v1/space/element`,
//       {
//         elementId: element1Id,
//         spaceId: spaceId,
//         x: 50,
//         y: 20,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     const newResponse = await axios.get(
//       `${BACKEND_URL}/api/v1/space/${spaceId}`,
//       {
//         headers: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(newResponse.data.elements.length).toBe(3);
//   });
// });
// describe("Admin endpoints", () => {
//   let adminId;
//   let adminToken;
//   let userToken;
//   let userId;

//   beforeAll(async () => {
//     const username = `sahil-${Math.random()}`;
//     const password = "123456";

//     const signupResponse = await axios.post(`${BACKEND_URL}/v1/api/signup`, {
//       username,
//       password,
//       type: "admin",
//     });

//     adminId = signupResponse.data.userId;
//     const response = await axios.post(`${BACKEND_URL}/v1/api/signin`, {
//       username,
//       password,
//     });
//     adminToken = response.data.token;

//     const userSignupResponse = await axios.post(
//       `${BACKEND_URL}/v1/api/signup`,
//       {
//         username: username + "-user",
//         password,
//         type: "user",
//       }
//     );

//     userId = userSignupResponse.data.userId;
//     const userSigninResponse = await axios.post(
//       `${BACKEND_URL}/v1/api/signin`,
//       {
//         username: username + "-user",
//         password,
//       }
//     );
//     userToken = userSiginResponse.data.token;
//   });
//   test("User is not able to hit admin Endpoints", async () => {
//     const elementResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
//       },
//       {
//         headers: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     const mapResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         defaultElements: [],
//       },
//       {
//         headers: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         name: "Timmy",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );

//     const updateElementResponse = await axios.put(
//       `${BACKEND_URL}/api/v1/admin/elemenet/123`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(elementResponse.status).toBe(403);
//     expect(mapResponse.status).toBe(403);
//     expect(avatarResponse.status).toBe(403);
//     expect(updateElementResponse.toBe(403));
//   });
//   test("Admin is not able to hit admin Endpoints", async () => {
//     const elementResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
//       },
//       {
//         headers: {
//           authorization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     const mapResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         defaultElements: [],
//       },
//       {
//         headers: {
//           authorization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         name: "Timmy",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     expect(elementResponse.status).toBe(200);
//     expect(mapResponse.status).toBe(200);
//     expect(avatarResponse.status).toBe(200);
//   });
//   test("Admin is able to upadte the image url for an elemenet", async () => {
//     const elementResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
//       },
//       {
//         headers: {
//           authorization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     const updateElementResponse = await axios.put(
//       `${BACKEND_URL}/api/v1/admin/elemenet/${elementResponse.data.id}`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(updateElementResponse.status).toBe(200);
//   });
// });
// describe("Websocket tests", () => {
//   let adminToken;
//   let adminUserId;
//   let userToken;
//   let userId;
//   let mapId;
//   let element1Id;
//   let element2Id;
//   let spaceId;
//   let ws1;
//   let ws2;
//   let ws1Messages = [];
//   let ws2Messages = [];
//   let userX;
//   let userY;
//   let adminX;
//   let adminY;

//   function waitForAndPopLatestMessage(messageArray) {
//     return new Promise((resolve) => {
//       if (messageArray.length > 0) {
//         resolve(messageArray.shift());
//       } else {
//         let interval = setInterval(() => {
//           if (messageArray.length > 0) {
//             resolve(messageArray.shift());
//             clearInterval(interval);
//           }
//         }, 100);
//       }
//     });
//   }
//   async function setupHTTP() {
//     const username = `Sahil-${Math.random()}`;
//     const password = `123456`;
//     const adminSignupResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signup`,
//       {
//         username,
//         password,
//         role: "admin",
//       }
//     );

//     const adminSigninResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signin`,
//       {
//         username: username + `-user`,
//         password,
//       }
//     );
//     adminUserId = adminSignupResponse.data.userId;
//     adminToken = adminSigninResponse.data.token;
//     const userSignupResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signup`,
//       {
//         username: username + `-user`,
//         password,
//       }
//     );

//     const userSigninResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signin`,
//       {
//         username,
//         password,
//       }
//     );
//     userId = userSignupResponse.data.userId;
//     userToken = userSigninResponse.data.token;

//     const element1Response = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
//       },
//       {
//         headers: {
//           authorization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     const element2Response = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${adminToken}`,
//         },
//       }
//     );

//     element1Id = element1Response.data.id;
//     element2Id = element2Response.data.id;

//     const mapResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "100 person interview room",
//         defaultElements: [
//           {
//             elementId: element1Id,
//             x: 20,
//             y: 20,
//           },
//           {
//             elementId: element1Id,
//             x: 18,
//             y: 20,
//           },
//           {
//             elementId: element2Id,
//             x: 19,
//             y: 20,
//           },
//         ],
//       },
//       {
//         headers: {
//           authorization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     mapId = mapResponse.id;
//     const spaceResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//         mapId: mapId,
//       },
//       {
//         headers: { authorization: `Bearer ${userToken}` },
//       }
//     );
//     spaceId = spaceResponse.data.id;
//   }
//   async function setupWs() {
//     ws1 = new WebSocket(WS_URL);

//     await new Promise((r) => {
//       ws1.onopen = r;
//     });
//     ws1.onmessage = (event) => {
//       ws1Messages.push(JSON.parse(event.data));
//     };
//     ws2 = new WebSocket(WS_URL);
//     await new Promise((r) => {
//       ws2.onopen = r;
//     });

//     ws2.onmessage = (event) => {
//       ws2Messages.push(JSON.parse(event.data));
//     };
//   }

//   beforeAll(async () => {
//     setupHTTP();
//     setupWs();
//   });

//   test("Get back ack for joining the space", async () => {
//     ws1.send(
//       JSON.stringify({
//         type: "join",
//         payload: {
//           spaceId: spaceId,
//           token: adminToken,
//         },
//       })
//     );

//     const message1 = await waitForAndPopLatestMessage(ws1Messages);
//     w2.send(
//       JSON.stringify({
//         type: "join",
//         payload: {
//           spaceId: spaceId,
//           token: userToken,
//         },
//       })
//     );

//     const message2 = await waitForAndPopLatestMessage(ws2Messages);
//     const message3 = await waitForAndPopLatestMessage(ws1Messages);

//     expect(message1.type).toBe("space-joined");
//     expect(message1.type).toBe("space-joined");
//     expect(message1.payload.users.length).toBe(0);
//     expect(message2.payload.users.length).toBe(1);
//     expect(message3.type).toBe("user-join");
//     expect(message3.payload.x).toBe(message2.payload.spawn.x);
//     expect(message3.payload.y).toBe(message2.payload.spawn.y);
//     expect(message3.payload.userId).toBe(userId);
//     adminX = message1.payload.spawn.x;
//     adminY = message1.payload.spawn.y;

//     userX = message2.payload.spawn.x;
//     userY = message2.payload.spawn.y;
//   });

//   test("User should not be able to move across the boundry of the wall", async () => {
//     ws1.send(
//       JSON.stringify({
//         type: movement,
//         payload: {
//           x: 1000023,
//           y: 2312324,
//         },
//       })
//     );
//     const message = await waitForAndPopLatestMessage(ws1Messages);
//     expect(message.type).toBe("movement-rejected");
//     expect(message.payload.x).toBe(adminX);
//     expect(message.payload.y).toBe(adminY);
//   });
//   test("User should not be able to move two blocks at the same time", async () => {
//     ws1.send(
//       JSON.stringify({
//         type: movement,
//         payload: {
//           x: adminX + 2,
//           y: adminY,
//         },
//       })
//     );
//     const message = await waitForAndPopLatestMessage(ws1Messages);
//     expect(message.type).toBe("movement-rejected");
//     expect(message.payload.x).toBe(adminX);
//     expect(message.payload.y).toBe(adminY);
//   });
//   test("Correct movement should be broadcasted to the other socket in the room", async () => {
//     ws1.send(
//       JSON.stringify({
//         type: movement,
//         payload: {
//           x: adminX + 1,
//           y: adminY,
//           userId: adminId,
//         },
//       })
//     );
//     const message = await waitForAndPopLatestMessage(ws2Messages);
//     expect(message.type).toBe("movement");
//     expect(message.payload.x).toBe(adminX + 1);
//     expect(message.payload.y).toBe(adminY);
//   });
//   test("If a user leaves the other user recives a leave event", async () => {
//     ws1.close();
//     const message = await waitForAndPopLatestMessage(ws2Messages);
//     expect(message.type).toBe("user-left");
//     expect(message.payload.userId).toBe(adminUserId);
//   });
// });
