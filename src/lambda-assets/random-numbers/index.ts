export async function handler(event: any) {
  console.log('Event', event);

  const min = 10;
  const max = 50;

  const result = Math.floor(Math.random() * (max - min) + min);

  console.log('The Random number is: ' + result);

  var response = {
    statusCode: 200,
    body: {
      result: result,
    },
  };

  console.log(response);

  return response;
}
