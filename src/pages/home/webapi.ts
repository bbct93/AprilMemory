import { Fetch } from '../../ctkits/index';

function testMysql() {
    return  Fetch.fetch({
        url: `/aaa`,
        method: 'GET',
      });

}


export default {
    testMysql
}