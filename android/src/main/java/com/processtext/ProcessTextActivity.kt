package com.processtext

import android.app.Activity
import android.content.Intent
import android.os.Bundle

class ProcessTextActivity : Activity() {

    companion object {
        var lastProcessText: String? = null
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val text = intent?.getCharSequenceExtra(Intent.EXTRA_PROCESS_TEXT)?.toString()
        lastProcessText = text

        // Get the host app's launch activity dynamically
        val pm = packageManager
        val launchIntent = pm.getLaunchIntentForPackage(packageName)?.apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
            // putExtra(Intent.EXTRA_PROCESS_TEXT, text)
        }

        if (launchIntent != null) {
            startActivity(launchIntent)
        }

        finish()
    }
}
