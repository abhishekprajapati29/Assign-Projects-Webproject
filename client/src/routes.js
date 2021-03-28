import React from "react";
import { Route } from "react-router-dom";
import DiaryList from "../src/components/diarys/diary";
import UserProfile from "./components/profile/userprofile.js";
import Settings from "./components/setting/setting";
import ImageBlocks from "./Data/data";
import FileBlock from "./components/files/files.js";
import VideoBlock from "./components/videos/video.js";
import imagelist from "./Data/components/Images/imagelist";
import DiaryUpdate from "./components/diarys/components/updatediary.js";
import CreateDiary from "./components/diarys/components/creatediary.js";
import Todo from "./components/todo/todo.js";
import UserList from "./components/userslist/userlist.js";
import Chats from "./components/chat/App/index.js";
import Posts from "./components/profile/profiles";
import Post from "./components/chat/ConversationListItem/component/profile/profiles";
import Dashboard from "./components/dashboard/dashboard";
import DiaryRead from "../src/components/diarys/components/read.js";
import Notes from "../src/components/notes/notes";
import Plan from "./components/setting/components/plan.js";
import CreateProject from "./components/projects/components/create.js";
import Project from "./components/projects/project.js";
import MainP from "./components/projects/components/project-main.js";
import BrowseProject from "./components/projects/components/browseProject.js";
import CancelSubs from "./components/setting/components/cancel.js";

const BaseRouter = () => (
  <div>
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/diarys" component={DiaryList} />
    <Route exact path="/note" component={Notes} />
    <Route exact path="/create_diarys" component={CreateDiary} />
    <Route exact path="/diarys/:diaryID" component={DiaryUpdate} />
    <Route exact path="/diaryview/:diaryID" component={DiaryRead} />
    <Route exact path="/account" component={UserProfile} />
    <Route exact path="/profile" component={Posts} />
    <Route exact path="/team-member-profile/:memberID" component={Post} />
    <Route exact path="/settings" component={Settings} />
    <Route exact path="/data" component={ImageBlocks} />
    <Route exact path="/data/images/:imageID" component={imagelist} />
    <Route exact path="/todolist" component={Todo} />
    <Route exact path="/userlist" component={UserList} />
    <Route exact path="/teamforum" component={Chats} />
    <Route exact path="/files" component={FileBlock} />
    <Route exact path="/videos" component={VideoBlock} />
    <Route exact path="/plan" component={Plan} />
    <Route exact path="/create-project" component={CreateProject} />
    <Route exact path="/project" component={Project} />
    <Route exact path="/project/:projectID" component={MainP} />
    <Route exact path="/browse" component={BrowseProject} />
    <Route exact path="/cancel" component={CancelSubs} />
  </div>
);

export default BaseRouter;
