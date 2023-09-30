"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/r/[communityId]",{

/***/ "./src/hooks/usePosts.tsx":
/*!********************************!*\
  !*** ./src/hooks/usePosts.tsx ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! recoil */ \"./node_modules/recoil/es/index.js\");\n/* harmony import */ var _atoms_PostsAtom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../atoms/PostsAtom */ \"./src/atoms/PostsAtom.ts\");\n/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/storage */ \"./node_modules/firebase/storage/dist/esm/index.esm.js\");\n/* harmony import */ var _firebase_clientApp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../firebase/clientApp */ \"./src/firebase/clientApp.ts\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var react_firebase_hooks_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-firebase-hooks/auth */ \"./node_modules/react-firebase-hooks/auth/dist/index.esm.js\");\n/* harmony import */ var _atoms_communitiesAtom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../atoms/communitiesAtom */ \"./src/atoms/communitiesAtom.ts\");\n/* harmony import */ var _atoms_authModalAtom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../atoms/authModalAtom */ \"./src/atoms/authModalAtom.ts\");\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\nconst usePosts = ()=>{\n    _s();\n    const [user, loadingUser] = (0,react_firebase_hooks_auth__WEBPACK_IMPORTED_MODULE_6__.useAuthState)(_firebase_clientApp__WEBPACK_IMPORTED_MODULE_4__.auth);\n    const [postStateValue, setPostStateValue] = (0,recoil__WEBPACK_IMPORTED_MODULE_1__.useRecoilState)(_atoms_PostsAtom__WEBPACK_IMPORTED_MODULE_2__.postState);\n    const currentCommunity = (0,recoil__WEBPACK_IMPORTED_MODULE_1__.useRecoilValue)(_atoms_communitiesAtom__WEBPACK_IMPORTED_MODULE_7__.communityState).currentCommunity;\n    const setAuthModalState = (0,recoil__WEBPACK_IMPORTED_MODULE_1__.useSetRecoilState)(_atoms_authModalAtom__WEBPACK_IMPORTED_MODULE_8__.authModalState);\n    const onVote = async (post, voteAtr, communityId)=>{\n        if (!(user === null || user === void 0 ? void 0 : user.uid)) {\n            setAuthModalState({\n                open: true,\n                view: \"login\"\n            });\n            return;\n        }\n        //已有投票数\n        const { voteStatus  } = post;\n        //此帖子是否投票\n        const existingVote = postStateValue.postVotes.find((votePost)=>votePost.postId === post.id);\n        console.log(existingVote);\n        try {\n            // batch写入\n            const batch = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.writeBatch)(_firebase_clientApp__WEBPACK_IMPORTED_MODULE_4__.firestore);\n            // the posts that are voted\n            const updatedPost = {\n                ...post\n            };\n            // array of posts\n            const updatedPosts = [\n                ...postStateValue.posts\n            ];\n            // which has been voted\n            let updatedPostVotes = [\n                ...postStateValue.postVotes\n            ];\n            let voteChange = voteAtr;\n            // New vote\n            if (!existingVote) {\n                // 存入数据库中\n                const postVoteRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.doc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.collection)(_firebase_clientApp__WEBPACK_IMPORTED_MODULE_4__.firestore, \"users\", \"\".concat(user === null || user === void 0 ? void 0 : user.uid, \"/postVotes\")));\n                // create a new document post\n                const newVote = {\n                    id: postVoteRef.id,\n                    postId: post.id,\n                    communityId,\n                    voteValue: voteAtr\n                };\n                console.log(\"NEW VOTE!!!\", newVote);\n                batch.set(postVoteRef, newVote);\n                console.log(\"BATCH_SET successful\");\n                // 总数\n                // add/subtract 1 to/from post.voteStatus\n                updatedPost.voteStatus = voteStatus + voteAtr;\n                console.log(updatedPost.voteStatus);\n                // 数组里面每个数\n                updatedPostVotes = [\n                    ...updatedPostVotes,\n                    newVote\n                ];\n                console.log(updatedPostVotes);\n            } else {\n                //从文件夹中找出\n                const postVoteRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.doc)(_firebase_clientApp__WEBPACK_IMPORTED_MODULE_4__.firestore, \"users\", \"\".concat(user === null || user === void 0 ? void 0 : user.uid, \"/postVotes/\").concat(existingVote.id));\n                // Existing vote - they have voted on the post before\n                // remove their vote\n                if (existingVote.voteValue === voteAtr) {\n                    // add/subtract 1 to/from post.voteStatus\n                    // opposite direction\n                    updatedPost.voteStatus = voteStatus - voteAtr;\n                    // remove Existing vote post from the array\n                    updatedPostVotes = updatedPostVotes.filter((votePost)=>votePost.id !== existingVote.id);\n                    // delete postVote document\n                    // 数据库删除\n                    batch.delete(postVoteRef);\n                    voteChange *= -1;\n                } else {\n                    //flip their vote\n                    // add/subtract 2 to/from post.voteStatus\n                    updatedPost.voteStatus = voteStatus + 2 * voteAtr;\n                    const voteIdx = postStateValue.postVotes.findIndex((votePost)=>votePost.id === existingVote.id);\n                    // Vote was found - findIndex returns -1 if not found\n                    // update voteValue\n                    if (voteIdx !== -1) {\n                        updatedPostVotes[voteIdx] = {\n                            ...existingVote,\n                            voteValue: voteAtr\n                        };\n                    }\n                    // updating the existing postVote document\n                    batch.update(postVoteRef, {\n                        voteValue: voteAtr\n                    });\n                    voteChange = 2 * voteAtr;\n                }\n                // update the post document\n                // 数据库里面的另外一个文件夹\n                const postRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.doc)(_firebase_clientApp__WEBPACK_IMPORTED_MODULE_4__.firestore, \"posts\", post.id);\n                batch.update(postRef, {\n                    voteStatus: voteStatus + voteChange\n                });\n                await batch.commit();\n                //update state with updated values\n                const postIdx = postStateValue.posts.findIndex((item)=>item.id === post.id);\n                updatedPosts[postIdx] = updatedPost;\n                setPostStateValue((prev)=>({\n                        ...prev,\n                        posts: updatedPosts,\n                        postVotes: updatedPostVotes\n                    }));\n            }\n        } catch (error) {\n            console.log(\"onVote Error\", error);\n        }\n    };\n    const onSelectPost = ()=>{};\n    const onDeletePost = async (post)=>{\n        try {\n            // check if image, delete if exists\n            if (post.imageURL) {\n                const imageRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.ref)(_firebase_clientApp__WEBPACK_IMPORTED_MODULE_4__.storage, \"posts/\".concat(post.id, \"/image\"));\n                await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.deleteObject)(imageRef);\n            }\n            // delete post document from firestore\n            const postDocRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.doc)(_firebase_clientApp__WEBPACK_IMPORTED_MODULE_4__.firestore, \"posts\", post.id);\n            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.deleteDoc)(postDocRef);\n            // update recoil state\n            setPostStateValue((prev)=>({\n                    ...prev,\n                    posts: prev.posts.filter((item)=>item.id !== post.id)\n                }));\n            return true;\n        } catch (error) {}\n        return true;\n    };\n    // render the UI\n    const getCommunityPostVote = async (communityId)=>{\n        const postVotesQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.collection)(_firebase_clientApp__WEBPACK_IMPORTED_MODULE_4__.firestore, \"users\", \"\".concat(user === null || user === void 0 ? void 0 : user.uid, \"/postVotes\")), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.where)(\"communityId\", \"==\", communityId));\n        const postVoteDocs = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.getDocs)(postVotesQuery);\n        const postVotes = postVoteDocs.docs.map((doc)=>({\n                id: doc.id,\n                ...doc.data\n            }));\n        setPostStateValue((prev)=>({\n                ...prev,\n                postVotes: postVotes\n            }));\n    };\n    // inside the [] is dependency\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        if (!user || !(currentCommunity === null || currentCommunity === void 0 ? void 0 : currentCommunity.id)) return;\n        getCommunityPostVote(currentCommunity === null || currentCommunity === void 0 ? void 0 : currentCommunity.id);\n    }, [\n        user,\n        currentCommunity\n    ]);\n    // login or not?\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        if (!user) {\n            // clear user post\n            setPostStateValue((prev)=>({\n                    ...prev,\n                    postVotes: []\n                }));\n        }\n    }, [\n        user\n    ]);\n    return {\n        postStateValue,\n        setPostStateValue,\n        onVote,\n        onSelectPost,\n        onDeletePost\n    };\n};\n_s(usePosts, \"iHzXbr+Rg13FkxIshmoMR2XHTug=\", false, function() {\n    return [\n        react_firebase_hooks_auth__WEBPACK_IMPORTED_MODULE_6__.useAuthState,\n        recoil__WEBPACK_IMPORTED_MODULE_1__.useRecoilState,\n        recoil__WEBPACK_IMPORTED_MODULE_1__.useRecoilValue,\n        recoil__WEBPACK_IMPORTED_MODULE_1__.useSetRecoilState\n    ];\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (usePosts);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLENBQUNxQixNQUFNO1lBQ1Asa0JBQWtCO1lBQ2xCRyxrQkFBa0IsQ0FBQ3NDLE9BQVU7b0JBQ3pCLEdBQUdBLElBQUk7b0JBQ1AxQixXQUFXLEVBQUU7Z0JBQ2pCO1FBQ0o7SUFDSixHQUFHO1FBQUNmO0tBQUs7SUFFVCxPQUFPO1FBQ0hFO1FBQ0FDO1FBQ0FHO1FBQ0FxQztRQUNBQztJQUNKO0FBQ0o7R0FyTk03Qzs7UUFFMEJILG1FQUFZQTtRQUVJaEIsa0RBQWNBO1FBRWpDQyxrREFBY0E7UUFFYkMscURBQWlCQTs7O0FBOE0vQywrREFBZWlCLFFBQVFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2hvb2tzL3VzZVBvc3RzLnRzeD8xNzkwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VSZWNvaWxTdGF0ZSwgdXNlUmVjb2lsVmFsdWUsIHVzZVNldFJlY29pbFN0YXRlIH0gZnJvbSAncmVjb2lsJztcbmltcG9ydCB7IFBvc3QsIFBvc3RWb3RlLCBwb3N0U3RhdGUgfSBmcm9tICcuLi9hdG9tcy9Qb3N0c0F0b20nO1xuaW1wb3J0IHsgZGVsZXRlT2JqZWN0LCByZWYgfSBmcm9tICdmaXJlYmFzZS9zdG9yYWdlJztcbmltcG9ydCB7IGF1dGgsIGZpcmVzdG9yZSwgc3RvcmFnZSB9IGZyb20gJy4uL2ZpcmViYXNlL2NsaWVudEFwcCc7XG5pbXBvcnQgeyBjb2xsZWN0aW9uLCBkZWxldGVEb2MsIGRvYywgZ2V0RG9jcywgcXVlcnksIHdoZXJlLCB3cml0ZUJhdGNoIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcbmltcG9ydCB7IHVzZUF1dGhTdGF0ZSB9IGZyb20gJ3JlYWN0LWZpcmViYXNlLWhvb2tzL2F1dGgnO1xuaW1wb3J0IHsgY29tbXVuaXR5U3RhdGUgfSBmcm9tICcuLi9hdG9tcy9jb21tdW5pdGllc0F0b20nO1xuaW1wb3J0IHsgYXV0aE1vZGFsU3RhdGUgfSBmcm9tICcuLi9hdG9tcy9hdXRoTW9kYWxBdG9tJztcblxuY29uc3QgdXNlUG9zdHMgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBbdXNlciwgbG9hZGluZ1VzZXJdID0gdXNlQXV0aFN0YXRlKGF1dGgpXG5cbiAgICBjb25zdCBbcG9zdFN0YXRlVmFsdWUsIHNldFBvc3RTdGF0ZVZhbHVlXSA9IHVzZVJlY29pbFN0YXRlKHBvc3RTdGF0ZSlcblxuICAgIGNvbnN0IGN1cnJlbnRDb21tdW5pdHkgPSB1c2VSZWNvaWxWYWx1ZShjb21tdW5pdHlTdGF0ZSkuY3VycmVudENvbW11bml0eTtcblxuICAgIGNvbnN0IHNldEF1dGhNb2RhbFN0YXRlID0gdXNlU2V0UmVjb2lsU3RhdGUoYXV0aE1vZGFsU3RhdGUpO1xuICAgIFxuICAgIGNvbnN0IG9uVm90ZSA9IGFzeW5jIChwb3N0OiBQb3N0LCB2b3RlQXRyOiBudW1iZXIsIGNvbW11bml0eUlkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKCF1c2VyPy51aWQpIHtcbiAgICAgICAgICAgIHNldEF1dGhNb2RhbFN0YXRlKHtvcGVuOiB0cnVlLCB2aWV3OiAnbG9naW4nfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL+W3suacieaKleelqOaVsFxuICAgICAgICBjb25zdCB7dm90ZVN0YXR1c30gPSBwb3N0O1xuICAgICAgICAvL+atpOW4luWtkOaYr+WQpuaKleelqFxuICAgICAgICBjb25zdCBleGlzdGluZ1ZvdGUgPSBwb3N0U3RhdGVWYWx1ZS5wb3N0Vm90ZXMuZmluZChcbiAgICAgICAgICAgICh2b3RlUG9zdCkgPT4gdm90ZVBvc3QucG9zdElkID09PSBwb3N0LmlkXG4gICAgICAgIClcblxuICAgICAgICBjb25zb2xlLmxvZyhleGlzdGluZ1ZvdGUpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBiYXRjaOWGmeWFpVxuICAgICAgICAgICAgY29uc3QgYmF0Y2ggPSB3cml0ZUJhdGNoKGZpcmVzdG9yZSk7XG4gICAgICAgICAgICAvLyB0aGUgcG9zdHMgdGhhdCBhcmUgdm90ZWRcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRQb3N0ID0gey4uLnBvc3R9O1xuICAgICAgICAgICAgLy8gYXJyYXkgb2YgcG9zdHNcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRQb3N0cyA9IFsuLi5wb3N0U3RhdGVWYWx1ZS5wb3N0c107XG4gICAgICAgICAgICAvLyB3aGljaCBoYXMgYmVlbiB2b3RlZFxuICAgICAgICAgICAgbGV0IHVwZGF0ZWRQb3N0Vm90ZXMgPSBbLi4ucG9zdFN0YXRlVmFsdWUucG9zdFZvdGVzXTtcbiAgICAgICAgICAgIGxldCB2b3RlQ2hhbmdlID0gdm90ZUF0cjtcblxuXG4gICAgICAgICAgICAvLyBOZXcgdm90ZVxuICAgICAgICAgICAgaWYgKCFleGlzdGluZ1ZvdGUpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyDlrZjlhaXmlbDmja7lupPkuK1cbiAgICAgICAgICAgICAgICBjb25zdCBwb3N0Vm90ZVJlZiA9IGRvYyhjb2xsZWN0aW9uKGZpcmVzdG9yZSwgXCJ1c2Vyc1wiLCBgJHt1c2VyPy51aWR9L3Bvc3RWb3Rlc2ApKVxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBkb2N1bWVudCBwb3N0XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Vm90ZTogUG9zdFZvdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBwb3N0Vm90ZVJlZi5pZCxcbiAgICAgICAgICAgICAgICAgICAgcG9zdElkOiBwb3N0LmlkLFxuICAgICAgICAgICAgICAgICAgICBjb21tdW5pdHlJZCxcbiAgICAgICAgICAgICAgICAgICAgdm90ZVZhbHVlOiB2b3RlQXRyLCAgICAvLzEgb3IgLTFcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5FVyBWT1RFISEhXCIsIG5ld1ZvdGUpO1xuXG4gICAgICAgICAgICAgICAgYmF0Y2guc2V0KHBvc3RWb3RlUmVmLCBuZXdWb3RlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJBVENIX1NFVCBzdWNjZXNzZnVsXCIpO1xuXG4gICAgICAgICAgICAgICAgLy8g5oC75pWwXG4gICAgICAgICAgICAgICAgLy8gYWRkL3N1YnRyYWN0IDEgdG8vZnJvbSBwb3N0LnZvdGVTdGF0dXNcbiAgICAgICAgICAgICAgICB1cGRhdGVkUG9zdC52b3RlU3RhdHVzID0gdm90ZVN0YXR1cyArIHZvdGVBdHI7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXBkYXRlZFBvc3Qudm90ZVN0YXR1cyk7XG5cbiAgICAgICAgICAgICAgICAvLyDmlbDnu4Tph4zpnaLmr4/kuKrmlbBcbiAgICAgICAgICAgICAgICB1cGRhdGVkUG9zdFZvdGVzID0gWy4uLnVwZGF0ZWRQb3N0Vm90ZXMsIG5ld1ZvdGVdO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVwZGF0ZWRQb3N0Vm90ZXMpO1xuXG5cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8v5LuO5paH5Lu25aS55Lit5om+5Ye6XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zdFZvdGVSZWYgPSBkb2MoXG4gICAgICAgICAgICAgICAgICAgIGZpcmVzdG9yZSwgXG4gICAgICAgICAgICAgICAgICAgICd1c2VycycsIFxuICAgICAgICAgICAgICAgICAgICBgJHt1c2VyPy51aWR9L3Bvc3RWb3Rlcy8ke2V4aXN0aW5nVm90ZS5pZH1gXG4gICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgICAgLy8gRXhpc3Rpbmcgdm90ZSAtIHRoZXkgaGF2ZSB2b3RlZCBvbiB0aGUgcG9zdCBiZWZvcmVcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlaXIgdm90ZVxuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1ZvdGUudm90ZVZhbHVlID09PSB2b3RlQXRyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZC9zdWJ0cmFjdCAxIHRvL2Zyb20gcG9zdC52b3RlU3RhdHVzXG4gICAgICAgICAgICAgICAgICAgIC8vIG9wcG9zaXRlIGRpcmVjdGlvblxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkUG9zdC52b3RlU3RhdHVzID0gdm90ZVN0YXR1cyAtIHZvdGVBdHI7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBFeGlzdGluZyB2b3RlIHBvc3QgZnJvbSB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZFBvc3RWb3RlcyA9IHVwZGF0ZWRQb3N0Vm90ZXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHZvdGVQb3N0KSA9PiB2b3RlUG9zdC5pZCAhPT0gZXhpc3RpbmdWb3RlLmlkXG4gICAgICAgICAgICAgICAgICAgIClcblxuICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUgcG9zdFZvdGUgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLy8g5pWw5o2u5bqT5Yig6ZmkXG4gICAgICAgICAgICAgICAgICAgIGJhdGNoLmRlbGV0ZShwb3N0Vm90ZVJlZik7XG5cbiAgICAgICAgICAgICAgICAgICAgdm90ZUNoYW5nZSAqPSAtMTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vZmxpcCB0aGVpciB2b3RlXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZC9zdWJ0cmFjdCAyIHRvL2Zyb20gcG9zdC52b3RlU3RhdHVzXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRQb3N0LnZvdGVTdGF0dXMgPSB2b3RlU3RhdHVzICsgMiAqIHZvdGVBdHI7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgdm90ZUlkeCA9IHBvc3RTdGF0ZVZhbHVlLnBvc3RWb3Rlcy5maW5kSW5kZXgoXG4gICAgICAgICAgICAgICAgICAgICAgICAodm90ZVBvc3QpID0+IHZvdGVQb3N0LmlkID09PSBleGlzdGluZ1ZvdGUuaWRcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBWb3RlIHdhcyBmb3VuZCAtIGZpbmRJbmRleCByZXR1cm5zIC0xIGlmIG5vdCBmb3VuZFxuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdm90ZVZhbHVlXG4gICAgICAgICAgICAgICAgICAgIGlmICh2b3RlSWR4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZFBvc3RWb3Rlc1t2b3RlSWR4XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5leGlzdGluZ1ZvdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm90ZVZhbHVlOiB2b3RlQXRyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGluZyB0aGUgZXhpc3RpbmcgcG9zdFZvdGUgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgYmF0Y2gudXBkYXRlKHBvc3RWb3RlUmVmLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2b3RlVmFsdWU6IHZvdGVBdHIsXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgdm90ZUNoYW5nZSA9IDIgKiB2b3RlQXRyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHBvc3QgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAvLyDmlbDmja7lupPph4zpnaLnmoTlj6blpJbkuIDkuKrmlofku7blpLlcbiAgICAgICAgICAgICAgICBjb25zdCBwb3N0UmVmID0gZG9jKGZpcmVzdG9yZSwgJ3Bvc3RzJywgcG9zdC5pZCk7XG4gICAgICAgICAgICAgICAgYmF0Y2gudXBkYXRlKHBvc3RSZWYsIHt2b3RlU3RhdHVzOiB2b3RlU3RhdHVzICsgdm90ZUNoYW5nZX0pXG5cbiAgICAgICAgICAgICAgICBhd2FpdCBiYXRjaC5jb21taXQoKTtcblxuICAgICAgICAgICAgICAgIC8vdXBkYXRlIHN0YXRlIHdpdGggdXBkYXRlZCB2YWx1ZXNcbiAgICAgICAgICAgICAgICBjb25zdCBwb3N0SWR4ID0gcG9zdFN0YXRlVmFsdWUucG9zdHMuZmluZEluZGV4KFxuICAgICAgICAgICAgICAgICAgICAoaXRlbSkgPT4gaXRlbS5pZCA9PT0gcG9zdC5pZFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB1cGRhdGVkUG9zdHNbcG9zdElkeF0gPSB1cGRhdGVkUG9zdDtcbiAgICAgICAgICAgICAgICBzZXRQb3N0U3RhdGVWYWx1ZSgocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgcG9zdHM6IHVwZGF0ZWRQb3N0cyxcbiAgICAgICAgICAgICAgICAgICAgcG9zdFZvdGVzOiB1cGRhdGVkUG9zdFZvdGVzXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ29uVm90ZSBFcnJvcicsIGVycm9yKVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uU2VsZWN0UG9zdCA9ICgpID0+IHt9O1xuXG4gICAgY29uc3Qgb25EZWxldGVQb3N0ID0gYXN5bmMgKHBvc3Q6IFBvc3QpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGltYWdlLCBkZWxldGUgaWYgZXhpc3RzXG4gICAgICAgICAgICBpZiAocG9zdC5pbWFnZVVSTCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlUmVmID0gcmVmKHN0b3JhZ2UsIGBwb3N0cy8ke3Bvc3QuaWR9L2ltYWdlYCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgZGVsZXRlT2JqZWN0KGltYWdlUmVmKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGVsZXRlIHBvc3QgZG9jdW1lbnQgZnJvbSBmaXJlc3RvcmVcbiAgICAgICAgICAgIGNvbnN0IHBvc3REb2NSZWYgPSBkb2MoZmlyZXN0b3JlLCAncG9zdHMnLCBwb3N0LmlkISk7XG4gICAgICAgICAgICBhd2FpdCBkZWxldGVEb2MocG9zdERvY1JlZilcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHJlY29pbCBzdGF0ZVxuICAgICAgICAgICAgc2V0UG9zdFN0YXRlVmFsdWUocHJldiA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgcG9zdHM6IHByZXYucG9zdHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmlkICE9PSBwb3N0LmlkKVxuICAgICAgICAgICAgfSkpXG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuXG4gICAgLy8gcmVuZGVyIHRoZSBVSVxuICAgIGNvbnN0IGdldENvbW11bml0eVBvc3RWb3RlID0gYXN5bmMgKGNvbW11bml0eUlkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgcG9zdFZvdGVzUXVlcnkgPSBxdWVyeShcbiAgICAgICAgICAgIGNvbGxlY3Rpb24oZmlyZXN0b3JlLCAndXNlcnMnLCBgJHt1c2VyPy51aWR9L3Bvc3RWb3Rlc2ApLCBcbiAgICAgICAgICAgIHdoZXJlKFwiY29tbXVuaXR5SWRcIiwgXCI9PVwiLCBjb21tdW5pdHlJZClcbiAgICAgICAgKVxuXG4gICAgICAgIGNvbnN0IHBvc3RWb3RlRG9jcyA9IGF3YWl0IGdldERvY3MocG9zdFZvdGVzUXVlcnkpO1xuICAgICAgICBjb25zdCBwb3N0Vm90ZXMgPSBwb3N0Vm90ZURvY3MuZG9jcy5tYXAoKGRvYykgPT4gKHtcbiAgICAgICAgICAgIGlkOiBkb2MuaWQsXG4gICAgICAgICAgICAuLi5kb2MuZGF0YVxuICAgICAgICB9KSk7XG4gICAgICAgIHNldFBvc3RTdGF0ZVZhbHVlKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIHBvc3RWb3RlczogcG9zdFZvdGVzIGFzIFBvc3RWb3RlW11cbiAgICAgICAgfSkpXG4gICAgfSBcblxuICAgIC8vIGluc2lkZSB0aGUgW10gaXMgZGVwZW5kZW5jeVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmICghdXNlciB8fCAhY3VycmVudENvbW11bml0eT8uaWQpIHJldHVybjtcbiAgICAgICAgZ2V0Q29tbXVuaXR5UG9zdFZvdGUoY3VycmVudENvbW11bml0eT8uaWQpO1xuICAgIH0sIFt1c2VyLCBjdXJyZW50Q29tbXVuaXR5XSlcblxuXG5cbiAgICAvLyBsb2dpbiBvciBub3Q/XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAvLyBjbGVhciB1c2VyIHBvc3RcbiAgICAgICAgICAgIHNldFBvc3RTdGF0ZVZhbHVlKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgcG9zdFZvdGVzOiBbXVxuICAgICAgICAgICAgfSkpXG4gICAgICAgIH1cbiAgICB9LCBbdXNlcl0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwb3N0U3RhdGVWYWx1ZSxcbiAgICAgICAgc2V0UG9zdFN0YXRlVmFsdWUsXG4gICAgICAgIG9uVm90ZSxcbiAgICAgICAgb25TZWxlY3RQb3N0LFxuICAgICAgICBvbkRlbGV0ZVBvc3RcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCB1c2VQb3N0czsiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VSZWNvaWxTdGF0ZSIsInVzZVJlY29pbFZhbHVlIiwidXNlU2V0UmVjb2lsU3RhdGUiLCJwb3N0U3RhdGUiLCJkZWxldGVPYmplY3QiLCJyZWYiLCJhdXRoIiwiZmlyZXN0b3JlIiwic3RvcmFnZSIsImNvbGxlY3Rpb24iLCJkZWxldGVEb2MiLCJkb2MiLCJnZXREb2NzIiwicXVlcnkiLCJ3aGVyZSIsIndyaXRlQmF0Y2giLCJ1c2VBdXRoU3RhdGUiLCJjb21tdW5pdHlTdGF0ZSIsImF1dGhNb2RhbFN0YXRlIiwidXNlUG9zdHMiLCJ1c2VyIiwibG9hZGluZ1VzZXIiLCJwb3N0U3RhdGVWYWx1ZSIsInNldFBvc3RTdGF0ZVZhbHVlIiwiY3VycmVudENvbW11bml0eSIsInNldEF1dGhNb2RhbFN0YXRlIiwib25Wb3RlIiwicG9zdCIsInZvdGVBdHIiLCJjb21tdW5pdHlJZCIsInVpZCIsIm9wZW4iLCJ2aWV3Iiwidm90ZVN0YXR1cyIsImV4aXN0aW5nVm90ZSIsInBvc3RWb3RlcyIsImZpbmQiLCJ2b3RlUG9zdCIsInBvc3RJZCIsImlkIiwiY29uc29sZSIsImxvZyIsImJhdGNoIiwidXBkYXRlZFBvc3QiLCJ1cGRhdGVkUG9zdHMiLCJwb3N0cyIsInVwZGF0ZWRQb3N0Vm90ZXMiLCJ2b3RlQ2hhbmdlIiwicG9zdFZvdGVSZWYiLCJuZXdWb3RlIiwidm90ZVZhbHVlIiwic2V0IiwiZmlsdGVyIiwiZGVsZXRlIiwidm90ZUlkeCIsImZpbmRJbmRleCIsInVwZGF0ZSIsInBvc3RSZWYiLCJjb21taXQiLCJwb3N0SWR4IiwiaXRlbSIsInByZXYiLCJlcnJvciIsIm9uU2VsZWN0UG9zdCIsIm9uRGVsZXRlUG9zdCIsImltYWdlVVJMIiwiaW1hZ2VSZWYiLCJwb3N0RG9jUmVmIiwiZ2V0Q29tbXVuaXR5UG9zdFZvdGUiLCJwb3N0Vm90ZXNRdWVyeSIsInBvc3RWb3RlRG9jcyIsImRvY3MiLCJtYXAiLCJkYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/hooks/usePosts.tsx\n"));

/***/ })

});