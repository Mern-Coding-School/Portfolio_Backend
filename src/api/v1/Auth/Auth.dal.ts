import env_constant from '../../../constant/env.constant';
import jwt from 'jsonwebtoken';
import AuthConstant from './Auth.constant';
import AuthModel from './Auth.model';

class Auth_Dal {
  public FIND_byEmail = async (email: string) => {
    try {
      let find_User = await AuthModel.findOne({ email: email });
      return find_User;
    } catch (error: any) {
      throw new Error(AuthConstant.FAIL_TO_FIND_USER);
    }
  };

  public Encrept_Email = async (email: string) => {
    console.log('email', email);

    var token = jwt.sign({ email: email }, String(env_constant.JWT_SECRET), {
      expiresIn: '1h',
    });

    if (!token) {
      throw new Error(AuthConstant.FAIL_TO_ENCREPT_EMAIL);
    }
    console.log('token', token);
    return token;
  };

  public Check_Super_Admin = async (email: string) => {
    try {
      let find_User = await AuthModel.findOne({ email: email });

      if (find_User && find_User.role === 'Super Admin') {
        return true;
      }
      return false;
    } catch (error: any) {
      throw new Error(AuthConstant.FAIL_TO_FIND_USER);
    }
  };

  public User_Data = async (user: object, token: string) => {
    let data = {
      user: user,
      token: token,
    };
    return data;
  };

  public Verify_Token = async (token: string) => {
    try {
      interface Decoded {
        email: string;
        iat: number;
        exp: number;
      }

      let decoded = jwt.verify(
        token,
        String(env_constant.JWT_SECRET),
      ) as Decoded;
      if (!decoded) {
        throw new Error(AuthConstant.INVALID_TOKEN);
      }
      return decoded;
    } catch (error: any) {
      throw new Error(AuthConstant.FAIL_TO_DECRYPT_TOKEN);
    }
  };

  public isApproved = async (email: string) => {
    try {
      let find_User = await AuthModel.findOne({
        email: email,
        isApproved: true,
      });

      if (find_User) {
        return true;
      }
      return false;
    } catch (error: any) {
      throw new Error(AuthConstant.NOT_APPROVED);
    }
  };
}

export default new Auth_Dal();
