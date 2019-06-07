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
        data: {name: '陈涛'}
      });

}


export default {
    testMysql,
    mysql
}