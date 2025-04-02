# This file must be used with "source activate_node" *from bash*
# you cannot run it directly

PROJECT_NAME="rendesco"
NODE_VERSION="v22.14.0"

NODE_HOME="${HOME}/opt/node_venv"
NODE_PACKAGE="node-${NODE_VERSION}-$(uname | awk '{print tolower($0)}')-x64"

deactivate () {
    # reset old environment variables
    if [ -n "${_OLD_NODE_VIRTUAL_PATH}" ] ; then
        PATH="${_OLD_NODE_VIRTUAL_PATH}"
        export PATH
        unset _OLD_NODE_VIRTUAL_PATH
    fi

    # This should detect bash and zsh, which have a hash command that must
    # be called to get it to forget past commands.  Without forgetting
    # past commands the $PATH changes we made may not be respected
    if [ -n "${BASH}" -o -n "${ZSH_VERSION}" ] ; then
        hash -r
    fi

    if [ -n "${_OLD_VIRTUAL_PS1}" ] ; then
        PS1="${_OLD_VIRTUAL_PS1}"
        export PS1
        unset _OLD_VIRTUAL_PS1
    fi

    unset NODE_VIRTUAL_ENV
    if [ ! "${1}" = "nondestructive" ] ; then
    # Self destruct!
        unset -f deactivate
    fi
}

# unset irrelevant variables
deactivate nondestructive

NODE_VIRTUAL_ENV="${NODE_HOME}/${PROJECT_NAME}/${NODE_PACKAGE}"
export NODE_VIRTUAL_ENV

_OLD_NODE_VIRTUAL_PATH="${PATH}"
PATH="$NODE_VIRTUAL_ENV/bin:${PATH}"
export PATH

if [ -z "${NODE_VIRTUAL_ENV_DISABLE_PROMPT}" ] ; then
    _OLD_VIRTUAL_PS1="${PS1}"
    if [ "x(${PROJECT_NAME}_node_venv) " != x ] ; then
	PS1="(${PROJECT_NAME}_node_venv) ${PS1}"
    else
    if [ "`basename \"${NODE_VIRTUAL_ENV}\"`" = "__" ] ; then
        # special case for Aspen magic directories
        # see http://www.zetadev.com/software/aspen/
        PS1="[`basename \`dirname \"${NODE_VIRTUAL_ENV}\"\``] ${PS1}"
    else
        PS1="(`basename \"${NODE_VIRTUAL_ENV}\"`)${PS1}"
    fi
    fi
    export PS1
fi

# This should detect bash and zsh, which have a hash command that must
# be called to get it to forget past commands.  Without forgetting
# past commands the $PATH changes we made may not be respected
if [ -n "${BASH}" -o -n "${ZSH_VERSION}" ] ; then
    hash -r
fi
