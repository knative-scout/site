{{/*
Specialized .Values.host default value logic
*/}}
{{- define "site.host" -}}
{{- if .Values.host -}}
{{ .Values.host }}
{{- else if eq .Values.global.env "prod" -}}
www.kscout.io
{{- else -}}
{{ .Values.global.env }}-www.kscout.io
{{- end -}}
{{- end -}}
