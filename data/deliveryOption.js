import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';   //default export

export const deliveryOptions = [
{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},
{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},
{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption (deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  })
  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption){
  const today = dayjs();
  let daysToAdd = deliveryOption.deliveryDays;
  let deliveryDate = today;
  
  while(daysToAdd > 0){
    deliveryDate = deliveryDate.add(1, 'days');
    const dayOfweek = deliveryDate.day();  //0 = sunday, 6 = saturday;

    if(dayOfweek != 0 && dayOfweek != 6){
      daysToAdd --;
    }
  }
  
  const dateString = deliveryDate.format('dddd, MMMM D');

  return dateString;
}

export function orderDate(){
  const today = dayjs();
  return today.format('MMMM D');
}