import { Fetch } from '../../ctkits/index';

function testMysql() {
    return  Fetch.fetch({
        url: `/aaa`,
        method: 'GET',
      });

}

function mysql() {
    return  Fetch.fetch({
        url: `/mysql`,
        method: 'POST',
        data: {name: '蚌埠三中'}
      });

}


export default {
    testMysql,
    mysql
}