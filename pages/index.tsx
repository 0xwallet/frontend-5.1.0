import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Title from "../components/title";
import { languages, contentLanguageMap } from "../lib/i18n";
import { useSelector, connect } from "react-redux";

function Home(props: any) {
  const state = useSelector(state => state);
  console.log(state)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <br></br>
      <div>此时此刻的counter值:{props.counter}</div>
      <div
        onClick={() => {
          props.add(2);
        }}
      >
        点击增加add
      </div>
      -----------------------
      <div onClick={()=>{
        props.changeLng('en')
      }}>改变语言</div>
      <Link href="/list">
        <a>list</a>
      </Link>
      <br/>
      {/* 这种形式是属于前端的路由跳转，属于单页面运用，还在当前页面中 */}
      <Link href="/demo">
        <a>demo</a>
      </Link>
      <br/>
      {/* 这种形式类似与向后端路由发送请求，会刷新页面的 */}
      <a href="./list">href跳转</a>
      <br/>
      <a href="https://www.baidu.com/">跳转到百度</a>
      {/* {isDemo} */}
      <Title username="Peter" />
    </div>
  );
}
const mapStateToProps = state => ({
  counter: state.count,
  person: state.person,
  demoLn: state.lng
});
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    add: value => {
      dispatch({
        type: "INCREMENT",
        value: value
      });
    },
    changeLng: value => {
      dispatch({
        type: "CHANGELNG",
        value: value
      });
    }
  };
};
// 这个属于高阶组件， 传入一个组件，返回一个新的组件，从而在新的组件上面，通过props可以接受到一些新的属性
export default connect(mapStateToProps, mapDispatchToProps)(Home);

export async function getStaticProps({ params }) {
  const flag = {
    lng: "en"
  };
  const { default: lngDict = {} } = await import(`../locales/${flag.lng}.json`);

  return {
    props: { lng: flag.lng, lngDict }
  };
}
