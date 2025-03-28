import Logout from '../button/LogoutBtn';
import Management from './Management';
import LeaveBtn from '../button/LeaveBtn';
import { Link } from 'react-router-dom';

function PageTest() {
    return (
        <section className="sec">
            <div className="inner">
                <div className="item">
                    <h3>컴포넌트</h3>
                    <Logout />
                    <LeaveBtn />
                    <Link to={'/member'}>직원 관리</Link>
                    <br />
                    <Link to={'/member/signUpStatus'}>가입 승인</Link>
                </div>
            </div>
        </section>
    );
}
export default PageTest;
