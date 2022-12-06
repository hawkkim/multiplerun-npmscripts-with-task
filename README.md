# multiplerun-npmscripts-with-task

> 여러 repository 에 있는 여러 npm script 를 vscode 단축키로 한번에 실행하기

vscode 로 로컬 개발을 할 때,
매번 npm scripts 윈도우에서 원하는 script 를 찾아 돌리거나 terminal 에서 하나씩 실행시켜야 하는 불편함을 없애보고 싶었고, 방법을 찾아 적어놓았습니다

소정의 편법이 묻어있으며, `cmd + shift + b` 로 내가 지정한 npm script 를 모두 구동할 수 있습니다.

코드 예시도 같이 들어 있습니다

----

## 설명

- remote repository 와 연결된 폴더는 건드리지 않은 채로 내 환경에서만 local server 구동 단축키를 설정하고 싶은 경우를 가정함

## 필요한 것

1. vscode 의 task 기능
2. `npm-run-all` 패키지
3. vscode 에서 repo를 열 때 workspace 기반으로 열기

## 사용 방법

1. repo 바깥에 세팅을 보관할 디렉토리를 만든다
    - ex: `/task`
    - 샘플코드 기준으로 설명해보겠습니다
```bash
/open_me.code-workspace      # vscode 의 workspace 파일
/repos                       # 실제 repo 들이 있는 디렉토리
/task                        # 지금 설명 절차에 의해 만드는 디렉토리, 단축키로 구동하는 설정을 여기에 넣는 개인화 디렉토리 입니다.
```

2. vscode 에서 디렉토리들을 `workspace` 형태로 열어놓고 관련 디렉토리를 추가해 준다. 샘플코드에서는 `/multiple_npmscripts_run.code-workspace` 파일을 열면 됨
3. `/task` 디렉토리에서 `npm init`
4. `/task` 디렉토리에서 `npm install --save-dev npm-run-all`
5. `/task/package.json` 에 다음 내용 추가
```
"scripts": {
  "back-end": "cd ../maven/maven/be && npm run start:dev",
  "front-end": "cd ../maven/maven/fe && npm run start:dev",
  "run-all": "npm-run-all --parallel front-end back-end"
},
```
  - 위 스크립트의 의미
    - back-end는 `../repo/backend` 로 이동하여 `dev-be` 라는 npm script 를 실행 합니다
    - front-end는 `../repo/frontend` 로 이동하여 `dev-fe` 라는 npm script 를 실행 합니다
    - run-all 은 위에 정의한 `back-end` 와 `front-end`를 동시에 실행시킵니다

6. `run-all` 을 실행시켜보면 front-end 와 back-end 가 동시에 돌아감을 확인할 수 있음
7. `/task/.vscode/tasks.json` 을 생성
8. 다음 내용으로 작성하여 이 workspace 의 기본 빌드 설정을 `npm run run-all` 로 지정함
```
{
  "tasks": [
    {
      "type": "npm",
      "script": "run-all",
      "problemMatcher": [],
      "label": "npm: run-all",
      "detail": "npm-run-all --parallel front-end back-end",
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```
9. `cmd + shift + b` (빌드 단축키) 를 눌러서 2개의 npm script 가 잘 돌아가는지 확인

<img width="482" alt="image" src="https://user-images.githubusercontent.com/56115607/205822641-e7789b03-4657-417d-9b6e-40d88fa9911d.png">
