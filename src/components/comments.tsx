import React from "react";
import styled from "styled-components";
import { IComment, ICommentsProps } from "@/model";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";

const Container = styled.div`
  margin: 40px 0px 60px;

  .overlay {
    padding: 0;
  }

  .comment-title {
    font-size: 16px;
  }
  .hr-style {
    margin-top: 4px;
    border: solid 0.5px #eee;
  }
  .userImg > a {
    width: 38px;
  }
  .form .postComment {
    border-bottom: solid 0.5px #cecece;
  }
  .form .postBtn {
    border: none;
    background-color: #09090b;
  }
`;

const Comments: React.FC<ICommentsProps> = ({
  commentData,
  onSubmitComment,
}) => {
  return (
    <Container>
      <CommentSection
        currentUser={{
          currentUserId: "04",
          currentUserImg:
            "https://ui-avatars.com/api/name=User&background=random",
          currentUserProfile: "https://example.com/current-user",
          currentUserFullName: "Anonymous",
        }}
        logIn={{
          onLogin: () => alert("Vui lòng đăng nhập"),
          signUpLink: "/dang-ky",
        }}
        commentData={commentData}
        onSubmitAction={(data: IComment) => {
          onSubmitComment && onSubmitComment(data);
        }}
        placeHolder="Nhập bình luận của bạn..."
        currentData={(data: any) => {
          console.log("C", data);
        }}
      />
    </Container>
  );
};

export default Comments;
