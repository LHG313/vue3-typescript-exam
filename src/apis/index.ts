import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {IArticle} from '../types'

// API 원형
abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(instance: AxiosInstance) {
    this.instance = instance;

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  protected _handleRequest(config:AxiosRequestConfig) : AxiosRequestConfig {
    return config;
  }

  protected _handleResponse(axiosResponse:AxiosResponse) : AxiosResponse {
    return axiosResponse;
  }

  protected _handleError(error: AxiosError) {
    if (error.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      alert('요청을 처리하는 중에 오류가 발생하였습니다.');
    }
    else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      alert('서버 또는 네트워크의 상태가 좋지 않습니다.');
    }
    else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.log('Error', error.message);
    }

    return Promise.reject(error);
  };

  public postByForm<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    const params = new URLSearchParams();

    for ( let key in data ) {
      params.append(key, data[key]);
    }

    config =  {} as AxiosRequestConfig;

    config.headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    };

    return this.instance.post(url, params, config);
  }
}

// 응답타입1
interface Base__IResponseBodyType1 {
  resultCode:string;
  msg:string;
}

// /usr/article/list 의 응답 타입
export interface MainApi__article_list__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    articles: IArticle[]
  };
}

// /usr/article/detail 의 응답 타입
export interface MainApi__article_detail__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    article: IArticle
  };
}

export interface MainApi__article_doWrite__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}

export interface MainApi__member_authKey__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    authKey: string,
    id: number,
    name: string,
    nickname: string
  };
}

// http://localhost:8021/usr/ 와의 통신장치
export class MainApi extends HttpClient {
  public constructor() {
    super(
      axios.create({
        baseURL:'http://localhost:8021/usr/',
      })
    );
  }

  protected _handleRequest(config:AxiosRequestConfig) {
    config.params = {};
    config.params.authKey = localStorage.getItem("authKey");
    
    return config;
  };

  protected _handleResponse(axiosResponse:AxiosResponse) : AxiosResponse {
    if ( ["F-A", "F-B"].includes(axiosResponse?.data?.resultCode) ) {
      alert('로그인 후 이용해주세요.');

      localStorage.removeItem("authKey");
      localStorage.removeItem("loginedMemberId");
      localStorage.removeItem("loginedMemberName");
      localStorage.removeItem("loginedMemberNickname");

      location.replace('/member/login');
    }

    return axiosResponse;
  }

  // http://localhost:8021/usr/article/list?boardId=? 를 요청하고 응답을 받아오는 함수
  public article_list(boardId: number) {
    return this.instance.get<MainApi__article_list__IResponseBody>(`/article/list?boardId=${boardId}`);
  }

  // http://localhost:8021/usr/detail/id?id=? 를 요청하고 응답을 받아오는 함수
  public article_detail(id: number) {
    return this.instance.get<MainApi__article_detail__IResponseBody>(`/article/detail?id=${id}`);
  }

  public article_doWrite(boardId:number, title: string, body: string) {
    return this.postByForm<MainApi__article_doWrite__IResponseBody>(
      `/article/doAdd`, {
        boardId,
        title,
        body
      }
    );
  }

  public member_authKey(loginId:string, loginPw:string) {
    return this.instance.get<MainApi__member_authKey__IResponseBody>(`/member/authKey?loginId=${loginId}&loginPw=${loginPw}`);
  }
}